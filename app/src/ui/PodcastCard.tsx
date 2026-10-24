import type { Podcast } from '../domain/Podcast';

interface PodcastCardProps {
  podcast: Podcast;
}

/**
 * Otro átomo: muestra UN podcast. No sabe si viene de un arreglo mock, de iTunes
 * o de un test. Por eso se puede testear sola, sin levantar la app entera.
 */
export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <article className="podcast-card">
      <img
        className="podcast-cover"
        src={podcast.imageUrl}
        alt={`Portada de ${podcast.title}`}
        width={72}
        height={72}
      />
      <div className="podcast-info">
        <h3 className="podcast-title">{podcast.title}</h3>
        <p className="podcast-author">{podcast.author}</p>
        {podcast.episodeCount !== undefined && (
          <p className="podcast-episodes">{podcast.episodeCount} episodios</p>
        )}
      </div>
    </article>
  );
}
