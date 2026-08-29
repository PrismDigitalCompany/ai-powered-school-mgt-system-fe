import { iconMap } from "./iconMap";

const Icon = ({ name, fallback = "graduationCap", ...props }) => {
  const Component = iconMap[name] ?? iconMap[fallback];

  if (!Component) {
    if (import.meta.env.DEV) {
      console.warn(
        `Unknown icon: "${name}" kindly check the icon name and ensure it is defined in the iconMap.`,
      );
    }

    return null;
  }

  return <Component {...props} />;
};
export default Icon;
