export interface BJUPer100 {
  proteins: number;
  fats: number;
  carbs: number;
}

export interface RecipeData {
  id: string;
  title: string;
  duration: number;
  calories: number;
  weight: number;
  
  bjuPer100: {
    proteins: number;
    fats: number;
    carbs: number;
  };
  fiberPer100?: number; 
  image?: string;
  instructions: string[];
}

export interface TotalNutritionResult {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  fiber: number;
}

export interface CatalogPageProps {
  recipes: RecipeData[];
  mode?: 'all' | 'favorites';
  favoriteIds?: Set<string>;
  weights?: Record<string, number>;
  toggleFavorite?: (id: string) => void;
  setWeight?: (id: string, weight: number) => void;
  onResetWeight?: (id: string) => void;
  isLoading?: boolean;
}

export interface FavoriteToggleButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export interface RecipeCardProps {
  recipe: RecipeData;
  customWeight: number;
  isFavorite: boolean;
  onWeightChange: (id: string, weight: number) => void;
  onResetWeight: (id: string) => void;
  toggleFavorite?: (id: string) => void;
}

export interface RecipeGridProps {
  recipes: RecipeData[];
  weights?: Record<string, number>;
  setWeight?: (id: string, weight: number) => void;
  onResetWeight?: (id: string) => void;
  toggleFavorite?: (id: string) => void;
  favoriteIds?: Set<string>;
}

export interface RecipeNutritionSummaryProps {
  title?: string;
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
  fiber?: number;
}

export interface RecipeWeightInputProps {
  weight: number;
  onChange: (weight: number) => void;
  onReset: () => void;
}

export interface TotalNutritionProps {
  recipes: RecipeData[];
  favoriteIds: Set<string>;
  weights: Record<string, number>;
}

export interface StatCardProps {
  label: string;
  value: number;
  unit: string;
  percent?: number;
}

export interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export type CalorieOption = 'all' | 'upTo150' | 'upTo200' | 'upTo300';
export type DurationOption = 'all' | 'upTo5' | 'upTo15' | 'upTo30';
export type SortOption = 'default' | 'caloriesAsc' | 'caloriesDesc' | 'durationAsc' | 'durationDesc';

export interface FilterState {
  duration: DurationOption;
  calories: CalorieOption;
  hasHighProtein: boolean;
  hasHighFiber: boolean;
  sort: SortOption;
}

export interface FilterControlsProps {
  duration: DurationOption;
  calories: CalorieOption;
  hasHighProtein: boolean;
  hasHighFiber: boolean;
  onDurationChange: (val: DurationOption) => void;
  onCaloriesChange: (val: CalorieOption) => void;
  onHasHighProteinChange: (val: boolean) => void;
  onHasHighFiberChange: (val: boolean) => void;
}

export interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (newFilters: FilterState) => void;
}

export interface FilterSortProps {
  sort: SortOption;
  onSortChange: (val: SortOption) => void;
}

export interface FilterToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}