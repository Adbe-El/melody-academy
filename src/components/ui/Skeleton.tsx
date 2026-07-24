interface SkeletonProps {
  variant?: 'text' | 'title' | 'card' | 'image' | 'avatar' | 'table-row' | 'stat-card';
  count?: number;
  className?: string;
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-200 animate-pulse ${className}`} aria-hidden="true" />;
}

function TextSkeleton() {
  return <SkeletonBlock className="h-4 w-3/4 rounded bg-gray-200" />;
}

function TitleSkeleton() {
  return <SkeletonBlock className="h-8 w-1/2 rounded bg-gray-200" />;
}

function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-200/80 p-6 space-y-3">
      <SkeletonBlock className="h-44 w-full rounded-2xl" />
      <SkeletonBlock className="h-4 w-1/3 rounded" />
      <SkeletonBlock className="h-6 w-2/3 rounded" />
      <SkeletonBlock className="h-4 w-full rounded" />
      <SkeletonBlock className="h-4 w-1/2 rounded" />
    </div>
  );
}

function ImageSkeleton() {
  return <SkeletonBlock className="h-44 rounded-2xl" />;
}

function AvatarSkeleton() {
  return <SkeletonBlock className="w-10 h-10 rounded-full" />;
}

function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-3">
      <SkeletonBlock className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-4 w-1/3 rounded" />
        <SkeletonBlock className="h-3 w-1/2 rounded" />
      </div>
      <SkeletonBlock className="h-6 w-16 rounded-full" />
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-200/80 p-6 space-y-3">
      <SkeletonBlock className="w-10 h-10 rounded-xl" />
      <SkeletonBlock className="h-8 w-1/2 rounded" />
      <SkeletonBlock className="h-4 w-2/3 rounded" />
    </div>
  );
}

const variantMap = {
  text: TextSkeleton,
  title: TitleSkeleton,
  card: CardSkeleton,
  image: ImageSkeleton,
  avatar: AvatarSkeleton,
  'table-row': TableRowSkeleton,
  'stat-card': StatCardSkeleton,
};

export const Skeleton: React.FC<SkeletonProps> = ({ variant = 'text', count = 1, className = '' }) => {
  const Variant = variantMap[variant];

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <Variant key={i} />
      ))}
    </div>
  );
};
