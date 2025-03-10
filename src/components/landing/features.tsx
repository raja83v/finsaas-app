import * as LucideIcons from "lucide-react";
import { FEATURES } from "@/lib/constants";

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to manage financial services
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our comprehensive platform provides all the tools you need to
              efficiently manage gold loans and savings accounts.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {FEATURES.map((feature, index) => {
            const Icon = LucideIcons[feature.icon as keyof typeof LucideIcons];
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
