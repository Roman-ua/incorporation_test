import { AddressFields } from '../interfaces/interfaces';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('Text copied to clipboard (fallback)');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  }
};

export const copyAddressToClipboard = (address: AddressFields) => {
  if (!address) return;

  const addressString = Object.values(address)
    .filter((value) => value !== undefined && value !== null && value !== '')
    .join(', ');

  if (addressString) {
    navigator.clipboard
      .writeText(addressString)
      .then(() => {
        console.log('Адрес скопирован:', addressString);
      })
      .catch((err) => {
        console.error('Ошибка при копировании:', err);
      });
  } else {
    console.warn('Адрес пуст, нечего копировать.');
  }
};

export const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const dockFieldHandler = (state: string) => {
  if (state === 'Florida') {
    return 'Document #';
  }

  if (state === 'Delaware') {
    return 'File #';
  }

  return 'File #';
};

export function truncateString(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
