import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";

export const DashboardLayout = () => {
  return (
    <main className="flex flex-col lg:flex-row h-screen p-5 gap-4">
      <nav className="lg:w-1/4 flex flex-col gap-2 bg-white bg-opacity-10 p-5 rounded-3xl">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
          My AI Tools<span className="text-indigo-500">.</span>
        </h1>
        <span className="text-xl">Welcome</span>


        <div className="overflow-scroll overflow-x-hidden">
          {menuRoutes.map((option) => (
            <SidebarMenuItem key={option.to} {...option} />
          ))}
        </div>
      </nav>

      <section className=" flex flex-col lg:w-3/4 bg-white bg-opacity-10 lg:p-5 rounded-3xl">
        <div className=" h-full">
          <div className="flex flex-col flex-auto h-full lg:p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};
