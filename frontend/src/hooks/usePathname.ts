import { useLocation } from "react-router-dom";

export default function usePathname(): string {
  const location = useLocation();

  return location.pathname;
}
