import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import QueryParamsTable from "./QueryParamsTable";
import PropTypes from "prop-types";
import HeadersTable from "./HeadersTable";

const RequestTabs = () => {
  const [requestType, setRequestType] = useState("");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [params, setParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState("");

  const fireRequest = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Start the timer
      const startTime = performance.now();

      // Construct query params string
      const queryParams = params
        .reduce((acc, param) => {
          if (param.key) {
            acc.append(param.key, param.value);
          }
          return acc;
        }, new URLSearchParams())
        .toString();

      // Construct headers object
      const headersObj = headers.reduce((acc, header) => {
        if (header.key) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {});

      const requestUrl = queryParams ? `${url}?${queryParams}` : url;

      const res = await axios({
        method: requestType,
        url: requestUrl,
        headers: headersObj,
        data: body, // only for POST, PUT, PATCH methods
      });

      // Calculate response time
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      // Calculate response size
      const responseSize = new Blob([JSON.stringify(res.data)]).size;

      // Get status code
      const statusCode = res.status;

      // Update the state with response data
      setResponse({
        data: res.data,
        time: responseTime,
        size: responseSize,
        status: statusCode,
      });
    } catch (error) {
      setError({
        message: error.message,
        time: null,
        size: null,
        status: error.response?.status || null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRequestType = (event) => {
    setRequestType(event.target.value);
  };

  const calculateRows = (content) => {
    const lines = content.split("\n").length;
    return Math.min(Math.max(lines, 10), 20);
  };
  const formattedResponse = response
    ? JSON.stringify(response, null, 2)
    : error
    ? JSON.stringify(error, null, 2)
    : "";
  const responseRows = calculateRows(formattedResponse);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <>
      <Box sx={{ margin: "10px 10px" }}>
        <Box>
          <Stack direction="row">
            <FormControl style={{ width: "auto", minWidth: 120 }}>
              <InputLabel id="request-type-label">Type</InputLabel>
              <Select
                labelId="request-type-label"
                id="request-type-select"
                value={requestType}
                label="Type"
                onChange={handleChangeRequestType}
                disabled={isLoading}
              >
                <MenuItem value={"get"}>GET</MenuItem>
                <MenuItem value={"post"}>POST</MenuItem>
                <MenuItem value={"put"}>PUT</MenuItem>
                <MenuItem value={"patch"}>PATCH</MenuItem>
                <MenuItem value={"delete"}>DELETE</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </FormControl>

            <Button
              onClick={fireRequest}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send"}
            </Button>
          </Stack>
          <Box>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Params" {...a11yProps(0)} />
                <Tab label="Body" {...a11yProps(1)} />
                <Tab label="Headers" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={tabIndex} index={0}>
                <QueryParamsTable params={params} setParams={setParams} />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <TextField
                  label="Body"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <HeadersTable headers={headers} setHeaders={setHeaders} />
              </TabPanel>
            </Box>
          </Box>
          {/* Displaying API information */}
          {response && (
            <Box
              mt={2}
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="body2">Status: {response.status}</Typography>
              <Typography variant="body2">
                Time: {response.time.toFixed(2)} ms
              </Typography>
              <Typography variant="body2">
                Size: {response.size} bytes
              </Typography>
            </Box>
          )}

          {error && (
            <Box mt={2}>
              <Typography variant="body2" color="error">
                Error: {error.message}
              </Typography>
              {error.status && (
                <Typography variant="body2" color="error">
                  Status: {error.status}
                </Typography>
              )}
            </Box>
          )}
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <TextField
              multiline
              rows={responseRows}
              variant="outlined"
              fullWidth
              value={formattedResponse}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default RequestTabs;
