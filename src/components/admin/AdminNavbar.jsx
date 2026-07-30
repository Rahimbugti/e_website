function AdminNavbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Admin
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;