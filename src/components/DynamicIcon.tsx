import { HTMLAttributes, JSX } from "react";

type DynamicIconProps = HTMLAttributes<SVGElement> & {
    iconName: string | null;
};

const DEFAULT_ICON: string = "fa/FaQuestion";

const libs: Record<string, string> = {
    "fa": "react-icons/fa",
    "fa6": "react-icons/fa6",
    "si": "react-icons/si",
    "tb": "react-icons/tb",
    "ri": "react-icons/ri",
    "io": "react-icons/io",
    "io5": "react-icons/io5",
    "vsc": "react-icons/vsc",
    "ai": "react-icons/ai"
}

export async function DynamicIcon({ iconName, ...props }: DynamicIconProps): Promise<JSX.Element | null> {
    if (!iconName) iconName = DEFAULT_ICON

    const [lib, iconComponent] = iconName?.split("/");
    if (!lib || !iconComponent) return null;

    let ReactIcons = await import(libs[lib]);

    const Icon = (ReactIcons as any)[iconComponent.trim()];

    return <Icon {...props} />;
}