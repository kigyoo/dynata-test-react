import { Outlet } from "react-router-dom";
import AdminLayout from "../../components/Layout/admin/AdminLayout";

const AdminRoot = () => {
    return <AdminLayout><Outlet /></AdminLayout>;
}

export default AdminRoot;