import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/use-document-title";

export function NotFoundPage() {
  useDocumentTitle("anjie — not found");

  return (
    <div className="page landing">
      <Card className="mx-auto w-full max-w-xl shadow-none">
        <CardContent className="flex min-h-[50vh] flex-col justify-center gap-4 py-16">
          <div className="text-sm uppercase tracking-[0.2em] text-[#9b9a97]">404</div>
          <h1 className="landing-title">not here!</h1>
          <p className="text-base text-[#787774]">
            the page you asked for doesn&apos;t exist, but the rest of the site does.
          </p>
          <div>
            <Button asChild>
              <a href="/">back home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
