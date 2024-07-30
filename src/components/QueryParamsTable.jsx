import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

const QueryParamsTable = ({ params, setParams }) => {
  const [newParam, setNewParam] = useState({ key: "", value: "" });

  QueryParamsTable.propTypes = {
    params: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    setParams: PropTypes.func.isRequired,
  };
  const handleAddParam = () => {
    setParams([...params, newParam]);
    setNewParam({ key: "", value: "" });
  };

  const handleRemoveParam = (index) => {
    const updatedParams = params.filter((_, i) => i !== index);
    setParams(updatedParams);
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {params.map((param, index) => (
            <TableRow key={index}>
              <TableCell>{param.key}</TableCell>
              <TableCell>{param.value}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemoveParam(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <TextField
                placeholder="Key"
                value={newParam.key}
                onChange={(e) =>
                  setNewParam({ ...newParam, key: e.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <TextField
                placeholder="Value"
                value={newParam.value}
                onChange={(e) =>
                  setNewParam({ ...newParam, value: e.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <Button onClick={handleAddParam}>Add</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default QueryParamsTable;
