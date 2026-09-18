import { Outlet } from "react-router-dom";
import Icon from "../icons/Icon.jsx";

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:py-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
              <div className="flex items-center justify-center">
                <Icon name="graduationCap" className="h-5 w-5" />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold leading-tight text-slate-900">
                EduSphere
              </p>

              <p className="text-xs capitalize leading-tight text-slate-400">
                an intelligent school management platform
              </p>
            </div>
          </div>

          <Outlet />
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-linear-to-br from-brand-700 via-brand-600 to-brand-800 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative">
          <p className="text-sm font-medium capitalize text-brand-100">
            Trusted across 30+ schools in Nigeria
          </p>

          <h2 className="mt-3 max-w-md text-3xl font-semibold leading-snug text-white">
            The complete school management platform combining automation,
            analytics, and AI-powered insights for smarter decisions.
          </h2>
        </div>

        <div className="relative grid grid-cols-3 gap-4">
          {[
            { icon: "users", label: "Multi-role access" },
            { icon: "barChart3", label: "Live analytics" },
            { icon: "shieldCheck", label: "Trusted by Educators" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-xl bg-white/10 p-4 backdrop-blur"
            >
              <Icon name={icon} className="h-5 w-5 text-white" />

              <p className="mt-2 text-xs font-medium text-brand-50">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
