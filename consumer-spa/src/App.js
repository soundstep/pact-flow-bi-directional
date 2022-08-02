import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const query = `
{
  featuredSliderSlot1: targetedContainers(
    filter: { id: "6PE58jxxneY63rHfSD0h6Z", published: true }
  ) {
    ...CollectionFields
  }
  promotedProductionsSliderSlot4: targetedContainers(
    filter: { id: "7Iq7gzzv8duUKCbwtfENc", published: true }
  ) {
    ...CollectionFields
  }
  promotedProductionsSliderSlot2: targetedContainers(
    filter: { id: "4ynbPheciXholKySviVAIR", published: true }
  ) {
    ...CollectionFields
  }
  promotedProductionsSliderSlot3: targetedContainers(
    filter: { id: "2MEbm8J2QzICB2YC1o6EQp", published: true }
  ) {
    ...CollectionFields
  }
  promotedProductionsSliderSlot1: targetedContainers(
    filter: { id: "2iMpaAU4EXRtgQHEpZZrlA", published: true }
  ) {
    ...CollectionFields
  }
  genreSliderSlot1: targetedContainers(
    filter: { id: "3PhbJKEE6RtJuKCEZLc1MO", published: true }
  ) {
    ...CollectionFields
  }
  genreSliderSlot2: targetedContainers(
    filter: { id: "4Mw4BnGS3G2BlAYrCdRk0H", published: true }
  ) {
    ...CollectionFields
  }
  genreSliderSlot4: targetedContainers(
    filter: { id: "6Td6l6yZNUKAJL4OhjhVdE", published: true }
  ) {
    ...CollectionFields
  }
  genreSliderSlot3: targetedContainers(
    filter: { id: "43ey5GyghH8q5HOJVOuPmo", published: true }
  ) {
    ...CollectionFields
  }
}
fragment CollectionFields on TargetedContainer {
  id
  name
  destination
  priority
  content {
    ... on CollectionSpot {
      collection {
        id
        title
        subsequentJourney {
          name
          label
          destinationUrl(platform: CTV)
        }
        imageTreatment
        imageAspectRatio
        imageClass
        items(
          filter: {
            available: "NOW"
            features: [
              PROGRESSIVE
              OUTBAND_WEBVTT
              INBAND_AUDIO_DESCRIPTION
              MPEG_DASH
              WIDEVINE
            ]
            broadcaster: ITV
            platform: CTV
          }
        ) {
          itemType
          imageUrl
          ... on SeriesCollectionItem {
            seriesItem {
              seriesNumber
              synopses {
                ninety
              }
              brand {
                title
                categories
                imageUrl
              }
              earliestAvailableTitle {
                legacyId
                imageUrl
                broadcastDateTime
                brandLegacyId
                channel {
                  name
                }
                availableNow
              }
            }
          }
          ... on TitleCollectionItem {
            titleItem {
              ... on Special {
                categories
                title
                brand {
                  imageUrl
                }
              }
              ... on Film {
                categories
                title
                brand {
                  imageUrl
                }
              }
              ... on Episode {
                brand {
                  categories
                  title
                  imageUrl
                }
              }
              ... on Title {
                titleType
                imageUrl
                legacyId
                brandLegacyId
                brand {
                  title
                  legacyId
                  categories
                  imageUrl
                }
                synopses {
                  ninety
                }
                broadcastDateTime
                channel {
                  name
                }
                availableNow
              }
            }
          }
          ... on BrandCollectionItem {
            brandItem {
              title
              synopses {
                ninety
              }
              imageUrl
              legacyId
              categories
              latestAvailableTitle {
                legacyId
                imageUrl
                broadcastDateTime
                channel {
                  name
                }
                availableNow
              }
            }
          }
        }
      }
    }
  }
}
`;

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    console.log('OK', axios);
    axios.post('http://muninn.prd.oasvc.itv.com/discovery', {
      query
    }).then((res) => {
      setData(res.data.data);
    }).catch((err) => {
      console.log('Error', err);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Loading Muninn stuff (be on the VPN)...
        </p>
        <div class="code">
            <pre>
              {JSON.stringify(data, undefined, 2)}
            </pre>
          </div>
      </header>
    </div>
  );
}

export default App;
