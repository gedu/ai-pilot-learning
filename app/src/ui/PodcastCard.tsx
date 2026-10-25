import type { Podcast } from '../domain/Podcast';

interface PodcastCardProps {
  podcast: Podcast;
}

/**
 * Otro átomo: muestra UN podcast. No sabe si viene de un arreglo mock, de iTunes
 * o de un test. Por eso se puede testear sola, sin levantar la app entera.
 *
 * Paso 10: los detalles que nadie pide pero que se notan. Un podcast sin foto no
 * tiene que mostrar el ícono roto del browser, y en español el singular es
 * "1 episodio", no "1 episodios".
 */
export function PodcastCard({ podcast }: PodcastCardProps) {
  const count = podcast.episodeCount;

  return (
    <article className="podcast-card">
      <img
        className="podcast-cover"
        src={podcast.imageUrl === '' ? '/cover-empty.svg' : podcast.imageUrl}
        alt={`Portada de ${podcast.title}`}
        width={72}
        height={72}
        loading="lazy"
      />
      <div className="podcast-info">
        <h3 className="podcast-title">{podcast.title}</h3>
        <p className="podcast-author">{podcast.author}</p>
        {count !== undefined && (
          <p className="podcast-episodes">
            {count} {count === 1 ? 'episodio' : 'episodios'}
          </p>
        )}
      </div>
    </article>
  );
}
