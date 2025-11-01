import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);
  const isApiLoadedRef = useRef(false);

  const initializePlayer = () => {
    if (playerRef.current) return; // Already initialized

    try {
      playerRef.current = new (window as any).YT.Player('hero-video', {
        events: {
          onReady: (event: any) => {
            console.log('YouTube player ready');
            event.target.unMute();
            event.target.playVideo();
            setIsPlaying(true);
            setIsMuted(false);
          },
          onStateChange: (event: any) => {
            // Update playing state based on actual player state
            const YT = (window as any).YT;
            if (event.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing YouTube player:', error);
    }
  };

  useEffect(() => {
    // Check if API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      initializePlayer();
      return;
    }

    // Check if script is already being loaded
    if (isApiLoadedRef.current) return;
    isApiLoadedRef.current = true;

    // Load YouTube IFrame API
    const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      // Cleanup player on unmount
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const togglePlay = () => {
    if (playerRef.current && playerRef.current.getPlayerState) {
      try {
        if (isPlaying) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error toggling play:', error);
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current && typeof playerRef.current.isMuted === 'function') {
      try {
        const currentMuteState = playerRef.current.isMuted();
        if (currentMuteState) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch (error) {
        console.error('Error toggling mute:', error);
      }
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-20" aria-hidden />
      <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_top_left,hsla(var(--primary)/.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsla(var(--accent)/.25),transparent_50%)]" aria-hidden />

      <div className="container relative py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-muted-foreground mb-2 tracking-wide">
              {t('hero.metaDate')} • {t('hero.metaPlace')}
            </p>
            <h1 className="font-brand text-4xl md:text-5xl leading-tight mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-prose">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/exhibitor-packages">{t('hero.ctaExhibit')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sponsor-opportunities">{t('hero.ctaSponsor')}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-xl bg-soft-gradient shadow-elegant border overflow-hidden relative group"
            >
              <iframe
                id="hero-video"
                className="w-full h-full"
                src="https://www.youtube.com/embed/u_qFlTu7HTw?autoplay=1&loop=1&playlist=u_qFlTu7HTw&mute=0&controls=0&modestbranding=1&rel=0&enablejsapi=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1"
                title="MIA Business Expo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              
              {/* Transparent overlay to prevent direct clicks on video */}
              <div className="absolute inset-0 pointer-events-none" />
              
              {/* Custom Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={togglePlay}
                  className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
