import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';

/**
 * Size variant mapping for the Modal content panel.
 * Controls the maximum width of the modal dialog.
 */
const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw]',
} as const;

/**
 * Props for the {@link Modal} component.
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Transaction">
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 * ```
 */
export interface ModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Callback invoked when the modal requests to close */
  onClose: () => void;
  /** Optional title rendered in the modal header */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Size variant controlling maximum width of the dialog panel */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether clicking the backdrop closes the modal (default: `true`) */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes the modal (default: `true`) */
  closeOnEscape?: boolean;
  /** Additional class names applied to the modal content panel */
  className?: string;
  /** Whether to show the close button in the top-right corner (default: `true`) */
  showCloseButton?: boolean;
}

/**
 * A premium, accessible modal dialog for the VEYLIX design system.
 *
 * Renders via `createPortal` into `document.body` with a glassmorphism content
 * panel, animated backdrop, focus trapping, scroll-lock, and full WAI-ARIA
 * compliance (`role="dialog"`, `aria-modal`, `aria-labelledby`).
 *
 * @remarks
 * - Uses CSS keyframe animations for smooth enter/exit transitions.
 * - Implements a focus trap so keyboard navigation stays within the dialog.
 * - Automatically disables body scroll while open and restores on close.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Modal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Mint Asset"
 *   size="md"
 * >
 *   <p className="text-white/70">Your 3D asset is ready to mint.</p>
 *   <button onClick={() => setOpen(false)}>Confirm</button>
 * </Modal>
 * ```
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'md',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      className,
      showCloseButton = true,
    },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<Element | null>(null);
    const titleId = useRef(`veylix-modal-title-${Math.random().toString(36).slice(2, 9)}`).current;

    // ── Focus Trap ──────────────────────────────────────────────────────
    const trapFocus = useCallback((e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableSelectors =
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelectors),
      );

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }, []);

    // ── Escape key handler ──────────────────────────────────────────────
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          e.stopPropagation();
          onClose();
        }
        trapFocus(e);
      },
      [closeOnEscape, onClose, trapFocus],
    );

    // ── Scroll lock & focus management ──────────────────────────────────
    useEffect(() => {
      if (!isOpen) return;

      // Save the currently focused element to restore later
      previousActiveElement.current = document.activeElement;

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus the dialog panel after mount
      requestAnimationFrame(() => {
        dialogRef.current?.focus();
      });

      // Attach keyboard listener
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.removeEventListener('keydown', handleKeyDown);

        // Restore focus to the element that opened the modal
        if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus();
        }
      };
    }, [isOpen, handleKeyDown]);

    // ── Backdrop click handler ──────────────────────────────────────────
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose],
    );

    // Don't render anything when closed
    if (!isOpen) return null;

    return createPortal(
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          // Animated backdrop
          'bg-black/60 backdrop-blur-sm',
          'animate-[veylix-modal-backdrop-in_300ms_ease-out_forwards]',
        )}
        onClick={handleBackdropClick}
        data-testid="modal-backdrop"
      >
        {/* Inline keyframes – injected once via <style> */}
        <style>{`
          @keyframes veylix-modal-backdrop-in {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes veylix-modal-panel-in {
            from { opacity: 0; transform: scale(0.95) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Content Panel */}
        <div
          ref={(node) => {
            // Merge forwarded ref + internal ref
            (dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          className={cn(
            // Layout
            'relative w-full mx-4 outline-none',
            sizeClasses[size],
            // Glassmorphism
            'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl',
            'border border-[rgba(170,98,245,0.2)]',
            'rounded-xl',
            'shadow-[0_0_40px_rgba(170,98,245,0.15)]',
            // Animation
            'animate-[veylix-modal-panel-in_300ms_ease-out_forwards]',
            className,
          )}
          data-testid="modal-content"
        >
          {/* ── Header ─────────────────────────────────────────────────── */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 pt-5 pb-0">
              {title && (
                <h2
                  id={titleId}
                  className="text-lg font-display tracking-wide text-white"
                >
                  {title}
                </h2>
              )}

              {/* Spacer so close button is always right-aligned */}
              {!title && <span />}

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className={cn(
                    'ml-auto flex items-center justify-center w-8 h-8 rounded-lg',
                    'text-white/50 transition-all duration-300',
                    'hover:text-white hover:bg-white/10',
                    'hover:shadow-[0_0_12px_rgba(170,98,245,0.3)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA62F5]/50',
                  )}
                  data-testid="modal-close-button"
                >
                  {/* SVG × icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* ── Body ───────────────────────────────────────────────────── */}
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = 'Modal';
