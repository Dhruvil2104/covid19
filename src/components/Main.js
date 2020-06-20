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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faAngleDoubleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Container } from "react-bootstrap";
import TableReport from "./TableReport";
import { tableData } from "../utils";

const Main = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);

  useEffect(() => {
    // API for fetching countries data
    const getData = async () => {
      try {
        const response = await fetch("https://corona.lmao.ninja/v2/countries");
        const json = await response.json();
        console.log("json: ", json);
        setData(json);
      } catch (e) {
        console.log("error: ", e);
      }
    };

    // API for fetching US states daily cases data
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

    // API for fetching US states detailed cases data
    const getData3 = async () => {
      try {
        const response = await fetch("https://corona.lmao.ninja/v2/states");
        const json = await response.json();
        console.log("json: ", json);
        setData3(json);
      } catch (e) {
        console.log("error: ", e);
      }
    };

    getData();
    getData2();
    getData3();
  }, []);

  // -------------------------------------------------------
  // ------------------MAP COMPONENT------------------------
  // -------------------------------------------------------
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
                      <h3>{currCountry}</h3>
                      <Image
                        className="flag-img"
                        src={currFlag}
                        height="20px"
                        width="30px"
                      />
                      <Table className="tooltip-table">
                        <tbody>
                          <tr>
                            <th>Total Cases:</th>
                            <td className="primary">{currCases}</td>
                          </tr>
                          <tr>
                            <th>Active:</th>
                            <td className="warning">{currActive}</td>
                          </tr>
                          <tr>
                            <th>Deaths:</th>
                            <td className="danger">{currDeaths}</td>
                          </tr>
                          <tr>
                            <th>Recovered:</th>
                            <td className="success">{currRecovered}</td>
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
    const [state, setState] = useState("Alabama"); // dropdown selected state name
    const [stateObj, setStateObj] = useState(null); // dropdown selected state array
    const [stateLen, setStateLen] = useState(0); // state array length
    const [states, setStates] = useState(null); // array of US states
    const [maxYAxis, setMaxYAxis] = useState(0); // maximum cases for selecteds state

    useEffect(() => {
      if (data2) setStates(Object.keys(data2));

      // if (data2) {
      //   let statesArr = [];
      //   data2.forEach((item) => statesArr.push(item.state));
      //   setStates(statesArr.sort);
      // }
    }, [data2]);

    // useEffect(() => {
    //   console.log("state:", state);
    // }, [state]);

    useEffect(() => {
      setStateObj(data2[state]);
    }, [state, data2]);

    // useEffect(() => {
    //   console.log("stateObj:", stateObj);
    // }, [stateObj]);

    useEffect(() => {
      if (data2[state]) setStateLen(data2[state].length);
      else console.log("Not set data2!");
    }, [state, data2]);

    // useEffect(() => {
    //   console.log("stateLen:", stateLen);
    // }, [stateLen]);

    // useEffect(() => {
    //   console.log("maxYAxis:", maxYAxis);
    // }, [maxYAxis]);

    useEffect(() => {
      if (data2 && stateLen)
        setMaxYAxis(parseInt(stateObj[stateLen - 1]["confirmed"]));
      else console.log("Not set maxYAxis!");
    }, [stateObj, stateLen, data2]);

    return (
      state &&
      stateLen &&
      states && (
        <div className="chart-wrapper">
          <LineChart
            className="line-chart"
            width={1110}
            height={500}
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
          <Form className="form-chart">
            <FormGroup controlId="states-select" as={Row}>
              <FormLabel column sm={5}>
                Selected State:{" "}
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  as="select"
                  onChange={(e) => setState(e.target.value)}
                >
                  {states.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
          </Form>
        </div>
      )
    );
  };

  console.log("tableData", tableData("state", "State"));

  return (
    <>
      {data && data2 ? (
        <div id="main-wrapper ">
          <section className="title-wrapper d-flex align-items-center justify-content-center">
            <h1 className="title">
              <span className="title-badge">COVID-19 CORONAVIRUS PANDEMIC</span>
            </h1>
            <a href="#map-title" className="scroll-down">
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </a>
          </section>
          <Container>
            {data && (
              <section id="map-wrapper" className="section-wrapper">
                <h2 className="title" id="map-title">
                  1. COVID19 Countries Report
                </h2>
                <div style={{ height: "70vh", width: "100%" }}>
                  <MapWrapper
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </div>
                <em>
                  <b>Note: </b>
                  Please click on any marker to see cases info for that country
                </em>
              </section>
            )}
            {data2 && (
              <section id="chart-wrapper" className="section-wrapper">
                <h2 className="title">2. COVID19 US States Reports</h2>
                <ChartWrapper data2={data2} />
              </section>
            )}
            {data && (
              <TableReport
                data={data}
                columns={tableData("country", "Country")}
                title="Countries"
                srNo="3"
              />
            )}
            {data3 && (
              <TableReport
                data={data3}
                columns={tableData("state", "State").filter(
                  (item) =>
                    item.accessor !== "recovered" &&
                    item.accessor !== "todayRecovered"
                )}
                title="US States"
                srNo="4"
              />
            )}
          </Container>
        </div>
      ) : (
        <div className="spinner-wrapper d-flex align-items-center">
          <FontAwesomeIcon icon={faCircleNotch} spin />
        </div>
      )}
    </>
  );
};

export default Main;
