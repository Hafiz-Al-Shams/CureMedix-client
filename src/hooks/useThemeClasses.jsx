import { useDaisyTheme } from "./useDaisyTheme";


export function useThemeClasses() {
  const theme = useDaisyTheme();

  // return whichever Tailwind + DaisyUI classes you need
  return theme === 'dark'
    ? '!bg-base-neutral-500 !text-base-100'
    : '!bg-base-100 !text-neutral-500';
}
