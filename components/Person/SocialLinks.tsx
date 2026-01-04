import { useThemeStore } from "@/store/themeStore";

type ExternalIds = {
  imdb_id?: string | null;
  wikidata_id?: string | null;
  facebook_id?: string;
  instagram_id?: string;
  tiktok_id?: string;
  twitter_id?: string;
  youtube_id?: string;
};

type SocialKey = keyof ExternalIds;

const ICON_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

const SOCIAL_CONFIG: Record<
  SocialKey,
  {
    icon: string;
    buildUrl: (id: string) => string;
    iconUrl: string;
    iconUrlDark?: string;
  }
> = {
  imdb_id: {
    icon: "imdb",
    buildUrl: (id) => `https://www.imdb.com/name/${id}`,
    iconUrl: "https://img.icons8.com/color/48/imdb.png",
    iconUrlDark: "https://img.icons8.com/color/48/imdb.png",
  },
  wikidata_id: {
    icon: "wikidata",
    buildUrl: (id) => `https://www.wikidata.org/wiki/${id}`,
    iconUrl: "https://img.icons8.com/ios/50/wikipedia.png",
    iconUrlDark: "https://img.icons8.com/badges/48/wikipedia.png",
  },
  facebook_id: {
    icon: "facebook",
    buildUrl: (id) => `https://www.facebook.com/${id}`,
    iconUrl: "https://img.icons8.com/color/48/facebook.png",
    iconUrlDark: "https://img.icons8.com/color/48/facebook.png",
  },
  instagram_id: {
    icon: "instagram",
    buildUrl: (id) => `https://www.instagram.com/${id}`,
    iconUrl: "https://img.icons8.com/fluency/48/instagram-new.png",
    iconUrlDark: "https://img.icons8.com/fluency/48/instagram-new.png",
  },
  tiktok_id: {
    icon: "tiktok",
    buildUrl: (id) => `https://www.tiktok.com/@${id}`,
    iconUrl: "https://img.icons8.com/color/48/tiktok--v1.png",
    iconUrlDark: "https://img.icons8.com/color/48/tiktok--v1.png",
  },
  twitter_id: {
    icon: "twitter",
    buildUrl: (id) => `https://twitter.com/${id}`,
    iconUrl: "https://img.icons8.com/ios-filled/50/twitterx--v1.png",
    iconUrlDark: "https://img.icons8.com/badges/48/twitterx.png",
  },
  youtube_id: {
    icon: "youtube",
    buildUrl: (id) => `https://www.youtube.com/${id}`,
    iconUrl: "https://img.icons8.com/color/48/youtube-play.png",
    iconUrlDark: "https://img.icons8.com/color/48/youtube-play.png",
  },
};

type Props = {
  externalIds: ExternalIds;
};

export function SocialLinks({ externalIds }: Props) {
  const { theme } = useThemeStore();

  return (
    <div className="flex items-center gap-3 my-2">
      {(Object.keys(SOCIAL_CONFIG) as SocialKey[]).map((key) => {
        const value = externalIds[key];

        // ❌ không có data thì bỏ
        if (!value) return null;

        const { icon, buildUrl } = SOCIAL_CONFIG[key];

        return (
          <a
            key={key}
            href={buildUrl(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 hover:scale-110 transition"
          >
            <img
              src={
                theme === "light"
                  ? SOCIAL_CONFIG[key]?.iconUrl
                  : SOCIAL_CONFIG[key]?.iconUrlDark
              }
              alt={key}
              className="w-full h-full"
            />
          </a>
        );
      })}
    </div>
  );
}
