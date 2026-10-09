import { statePath } from "./statePaths";
import { stateGuides } from "./stateGuides";
import { regionPath } from "./regionGuides";

export function MapLocationDirectory() {
  return (
    <section
      className="map-location-directory"
      aria-label="Browse rental locations"
    >
      <h3>Browse rental locations</h3>
      <p>
        Open a state guide or expand its regions to find local rental planning
        guides. Confirm availability for your exact site and dates.
      </p>
      <div className="map-location-grid">
        {Object.entries(stateGuides)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([name, guide]) => (
            <div key={name}>
              <a className="map-location-state" href={statePath(name)}>
                Mobile Kitchen Trailer Rental in {name}
              </a>
              <details>
                <summary>Regions and cities in {name}</summary>
                <ul>
                  {guide.regions.map((region) => (
                    <li key={region}>
                      <a href={regionPath(name, region)}>{region}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
      </div>
    </section>
  );
}
