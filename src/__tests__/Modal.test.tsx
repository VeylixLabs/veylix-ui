import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Modal } from '../components/Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: false,
    onClose: vi.fn(),
  };

  // ── Visibility ──────────────────────────────────────────────────────

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal {...defaultProps} isOpen={false}>
        <p>Hidden content</p>
      </Modal>,
    );

    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument();
    expect(container.innerHTML).toBe('');
  });

  it('renders content when isOpen is true', () => {
    render(
      <Modal {...defaultProps} isOpen={true}>
        <p>Visible content</p>
      </Modal>,
    );

    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  // ── Title ───────────────────────────────────────────────────────────

  it('renders title when provided', () => {
    render(
      <Modal {...defaultProps} isOpen={true} title="Transaction Status">
        <p>Body</p>
      </Modal>,
    );

    expect(screen.getByText('Transaction Status')).toBeInTheDocument();

    // Should be referenced by aria-labelledby
    const dialog = screen.getByRole('dialog');
    const titleId = screen.getByText('Transaction Status').id;
    expect(dialog.getAttribute('aria-labelledby')).toBe(titleId);
  });

  // ── Escape key ──────────────────────────────────────────────────────

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} isOpen={true} onClose={onClose}>
        <p>Press Escape</p>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // ── Backdrop click ──────────────────────────────────────────────────

  it('calls onClose when backdrop is clicked (closeOnBackdropClick=true)', () => {
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} isOpen={true} onClose={onClose} closeOnBackdropClick={true}>
        <p>Content</p>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose on backdrop click when closeOnBackdropClick=false', () => {
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} isOpen={true} onClose={onClose} closeOnBackdropClick={false}>
        <p>Content</p>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).not.toHaveBeenCalled();
  });

  // ── Close button ────────────────────────────────────────────────────

  it('renders close button when showCloseButton=true', () => {
    render(
      <Modal {...defaultProps} isOpen={true} showCloseButton={true}>
        <p>Content</p>
      </Modal>,
    );

    const closeBtn = screen.getByTestId('modal-close-button');
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveAttribute('aria-label', 'Close modal');
  });

  // ── Size variants ──────────────────────────────────────────────────

  it('applies correct size class', () => {
    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-[90vw]',
    } as const;

    for (const [size, expected] of Object.entries(sizes)) {
      const { unmount } = render(
        <Modal
          {...defaultProps}
          isOpen={true}
          size={size as keyof typeof sizes}
        >
          <p>Sized content</p>
        </Modal>,
      );

      const panel = screen.getByTestId('modal-content');
      expect(panel.className).toContain(expected);

      unmount();
    }
  });
});
