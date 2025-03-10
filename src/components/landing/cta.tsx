import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to transform your financial institution?
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join hundreds of financial institutions that are already using
              GoldFin to streamline their operations.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="w-full min-[400px]:w-auto"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link to="/demo">
              <Button
                size="lg"
                variant="outline"
                className="w-full min-[400px]:w-auto border-primary-foreground hover:bg-primary-foreground/10"
              >
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
