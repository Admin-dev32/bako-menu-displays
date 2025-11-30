import React from 'react';

type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';

export interface BrandShellProps {
  children: React.ReactNode;
  className?: string;
  align?: AlignItems;
  justify?: JustifyContent;
}

const alignClassMap: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
};

const justifyClassMap: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around'
};

export function BrandShell({
  children,
  className,
  align = 'center',
  justify = 'center'
}: BrandShellProps) {
  const alignment = alignClassMap[align];
  const justification = justifyClassMap[justify];

  const composedClassName = [
    'flex min-h-screen w-full flex-col gap-8 px-6 py-10 sm:px-12 lg:px-16',
    'pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]',
    alignment,
    justification,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={composedClassName}>{children}</div>;
}
