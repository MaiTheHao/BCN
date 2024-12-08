import { useContext } from "react";
import AdminPagesContext from "./AdminPagesContext";

function useAdminPagesContext() {
  const context = useContext(AdminPagesContext);
  return context;
}

export default useAdminPagesContext;