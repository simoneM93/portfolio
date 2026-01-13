import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    title: string;
    subTitle: string;
}

export default function Header({ title, subTitle }: HeaderProps) {
    return (
        <div className="text-center mb-24 animate-in fade-in-30 duration-1000">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-8 group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                {title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {subTitle.split('<br/>').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                ))}
            </p>
        </div>
    );
}