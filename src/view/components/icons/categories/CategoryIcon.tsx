import { iconsMap } from './iconsMap';

interface CategoryIconProps {
  type: 'income' | 'outcome';
  category?: string;
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.outcome | typeof iconsMap.income)) ??
        'default'
    ] ?? iconsMap[type].default;

  return <Icon />;
}
