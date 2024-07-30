import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const RequestTabs = () => {
  const [requestType, setRequestType] = useState("");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fireRequest = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await axios[requestType](url);
      setResponse(res.data);
    } catch (error) {
      setError(error);
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
  return (
    <>
      <Box sx={{ margin: "10px 10px" }}>
        <Box>
          <Stack direction="row">
            <FormControl width="100%">
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
