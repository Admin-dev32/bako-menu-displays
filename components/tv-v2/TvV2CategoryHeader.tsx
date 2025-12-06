import { MenuCategory } from '@/lib/menu';

export type TvV2CategoryHeaderProps = {
  categoryName: string;
  icon?: string | null;
  category?: MenuCategory;
};

export default function TvV2CategoryHeader({ categoryName, icon }: TvV2CategoryHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white">
            {icon}
          </span>
        ) : null}
        <h2 className="text-3xl font-black tracking-tight text-white drop-shadow-md">
          {categoryName}
        </h2>
      </div>
      <div className="h-1 w-12 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent" />
    </div>
  );
}
