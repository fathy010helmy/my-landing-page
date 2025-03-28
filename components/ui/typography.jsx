export function TypographyH1({ children }) {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    );
  }
  
  export function TypographyP({ children, className }) {
    return (
      <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className || ""}`}>
        {children}
      </p>
    );
  }
  