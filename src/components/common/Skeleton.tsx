interface SkeletonProps {
  className?: string;
  rounded?: 'full' | 'xl' | '2xl' | '3xl';
}

export const Skeleton = ({ className = '', rounded = 'xl' }: SkeletonProps) => {
  const roundedMap = {
    full: 'rounded-full',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  return (
    <div
      className={`bg-gray-200 animate-pulse ${roundedMap[rounded]} ${className}`}
      aria-hidden="true"
    />
  );
};
