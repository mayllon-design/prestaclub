import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

interface VideoSectionProps {
  title?: string;
  videoId?: string;
  ctaText?: string;
  ctaLink?: string;
}

const VideoSection = ({
  title = "Conoce cómo funciona",
  videoId = "DYqcB5vEq_g",
  ctaText = "Precalifica ahora",
  ctaLink = "/financiamiento-con-garantia-hipotecaria#precalificar",
}: VideoSectionProps) => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">{title}</h2>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-8">
          <Button variant="hero" size="xl" asChild>
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
