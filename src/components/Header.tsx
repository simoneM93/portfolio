interface HeaderProps {
    title: string;
    subTitle?: React.ReactNode;
}

export default function Header({ title, subTitle }: HeaderProps) {
    return (
        <div className="text-center mb-12 md:mb-16 animate-in fade-in-30 duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-6 leading-tight">
                {title}
            </h1>
            {subTitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {subTitle}
              </p>
            )}
        </div>
    );
}
