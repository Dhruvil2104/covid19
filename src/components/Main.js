import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from "react-google-maps";
import {
  Image,
  Table,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import "./css/Main.scss";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const Main = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://corona.lmao.ninja/v2/countries");
        const json = await response.json();
        // console.log("json: ", json);
        setData(json);
      } catch (e) {
        console.log("error: ", e);
      }
    };

    const getData2 = async () => {
      try {
        const response = await fetch(
          "https://energ.ee/covid19-us-api/states.json"
        );
        const json = await response.json();
        console.log("json: ", json);
        setData2(json);
      } catch (e) {
        console.log("error: ", e);
      }
    };

    getData();
    getData2();
  }, []);

  const Map = () => {
    const [currentCountry, setCurrentCountry] = useState(null);

    return (
      <GoogleMap defaultCenter={{ lat: 38, lng: -97 }} defaultZoom={3}>
        {data
          .filter(({ countryInfo: { _id } }) => _id)
          .map((item, i) => {
            const {
              countryInfo: { lat, long: lng, _id },
            } = item;
            let currLat,
              currLng,
              currCases,
              currFlag,
              currActive,
              currRecovered,
              currCountry,
              currDeaths;
            if (currentCountry) {
              ({
                cases: currCases,
                deaths: currDeaths,
                active: currActive,
                recovered: currRecovered,
                country: currCountry,
                countryInfo: { flag: currFlag, lat: currLat, long: currLng },
              } = currentCountry);
            }

            return (
              <div key={_id}>
                <Marker
                  position={{ lat, lng }}
                  onClick={() => setCurrentCountry(item)}
                />
                {currentCountry && (
                  <InfoWindow
                    position={{ lat: currLat, lng: currLng }}
                    onCloseClick={() => setCurrentCountry(null)}
                    style={{
                      padding: "10px",
                      position: "relative",
                      minWidth: "200px",
                      width: "200px",
                    }}
                  >
                    <div className="tooltip-wrapper">
                      <h3>
                        {currCountry}
                        <Image
                          className="flag-img"
                          src={currFlag}
                          height="20px"
                          width="30px"
                        />
                      </h3>
                      <Table className="tooltip-table" striped bordered>
                        <tbody>
                          <tr>
                            <th>Total Cases:</th>
                            <td>{currCases}</td>
                          </tr>
                          <tr>
                            <th>Active:</th>
                            <td>{currActive}</td>
                          </tr>
                          <tr>
                            <th>Deaths:</th>
                            <td>{currDeaths}</td>
                          </tr>
                          <tr>
                            <th>Recovered:</th>
                            <td>{currRecovered}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </InfoWindow>
                )}
              </div>
            );
          })}
      </GoogleMap>
    );
  };

  const MapWrapper = withScriptjs(withGoogleMap(Map));

  // -------------------------------------------------------
  // ------------------CHARTS COMPONENT---------------------
  // -------------------------------------------------------

  const ChartWrapper = ({ data2 }) => {
    const [state, setState] = useState("Alabama");
    const [stateLen, setStateLen] = useState(0);
    const [states, setStates] = useState(null);
    const [maxYAxis, setMaxYAxis] = useState(0);

    // setState("Massachusetts");

    // useEffect(() => {
    //   console.log("data2: ", data2);
    // }, [data2]);

    // useEffect(() => {
    //   if (data2 && state && stateLen) {
    //     console.log("state ", state);

    //     // console.log("data2: ", Object.keys(data2));
    //     // console.log("data2[state] ", data2[state]);
    //     // console.log("cases ", data2[state][stateLen - 1].confirmed);
    //   }
    // }, [data2, state, stateLen]);

    useEffect(() => {
      if (data2) setStates(Object.keys(data2));
    }, [data2]);

    useEffect(() => {
      if (data2[state]) setStateLen(data2[state].length);
      else console.log("No data2!");
    }, [state, data2]);

    useEffect(() => {
      console.log("state:", state);
    }, [state]);

    useEffect(() => {
      console.log("stateLen:", stateLen);
      if (data2 && state && stateLen)
        setMaxYAxis(parseInt(data2[state][stateLen - 1]["confirmed"]));
    }, [data2, state, stateLen]);

    return state && stateLen && states ? (
      <>
        <LineChart
          className="line-chart"
          width={730}
          height={300}
          data={data2[state]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[0, maxYAxis]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
          <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
        </LineChart>
        <Form>
          <FormGroup controlId="states-select">
            <FormLabel>Selected State: </FormLabel>
            <FormControl as="select" onChange={(e) => setState(e.target.value)}>
              {states.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </Form>
      </>
    ) : null;
  };

  return (
    <>
      <div style={{ height: "50vh", width: "100vw" }}>
        {data && (
          <MapWrapper
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        )}
      </div>
      {data2 && <ChartWrapper data2={data2} />}
    </>
  );
};

export default Main;
