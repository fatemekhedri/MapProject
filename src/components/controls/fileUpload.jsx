import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography, ListItem, withStyles } from "@material-ui/core";
import Button from "./MDButton";
import { useState, useEffect } from "react";
import UploadService from "../../services/fileUploadService";
//import http from "../http-common";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const FileUpload = (props) => {
  const { fileTitle, id } = props;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);
  const [isError, setIsError] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);
  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };
  const getFiles = () => {
    return "tt";
    // return http.get("/files");
  };
  const uploadFile = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    // return http.post("/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   onUploadProgress,
    // });
  };
  const upload = () => {
    setProgress(0);

    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        setImageInfos(files.data);
      })
      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }

        setCurrentFile(undefined);
      });
  };
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-5">
          <label className="btn btn-default p-0" htmlFor="btn-upload">
            <input type="file" accept="image/*" onChange={selectFile} />
          </label>
        </div>

        <div className="col-5">
          <Button
            className="btn-upload"
            color="info"
            variant="contained"
            component="span"
            disabled={!currentFile}
            onClick={upload}
            style={{ minWidth: "150px" }}
          >
            {fileTitle}
          </Button>
        </div>
        <div className="col-2">
          {previewImage && (
            <div>
              <img
                style={{ width: "50px", height: "50px" }}
                className="preview"
                src={previewImage}
                alt=""
              />
            </div>
          )}
        </div>
      </div>

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}

      {/* <div className="card mt-3">
        <div className="card-header">List of Images</div>
        <ul className="list-group list-group-flush">
          {imageInfos &&
            imageInfos.map((img, index) => (
              <li className="list-group-item" key={index}>
                <p>
                  <a href={img.url}>{img.name}</a>
                </p>
                <img src={img.url} alt={img.name} height="80px" />
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
};
// <div className="w-100">
//   <label htmlFor="btn-upload" pt={2}>
//     {/* <input hidden accept="image/*" multiple type="file" /> */}
//     <input
//       id="btn-upload"
//       name="btn-upload"
//       hidden
//       type="file"
//       onChange={selectFile}
//     />
//     <Button
//       className="btn-choose"
//       variant="outlined"
//       component="span"
//       color="secondary"
//       style={{ minWidth: "300px" }}
//     >
//       {fileTitle}
//     </Button>
//   </label>
//   <Button
//     className="btn-upload m-2"
//     color="info"
//     variant="contained"
//     component="span"
//     style={{ minWidth: "120px" }}
//     disabled={!selectedFiles}
//     onClick={upload}
//   >
//     بارگذاری
//   </Button>
//   {previewImage && (
//     <img
//       style={{ width: "70px", height: "70px" }}
//       src={previewImage}
//       alt=""
//     />
//   )}
//   <div className="file-name">
//     {selectedFiles && selectedFiles.length > 0
//       ? selectedFiles[0].name
//       : null}
//   </div>
//   {currentFile && (
//     <Box className="mb25" display="flex" alignItems="center">
//       <Box width="100%" mt={1}>
//         <BorderLinearProgress variant="determinate" value={progress} />
//       </Box>
//       <Box minWidth={12}>
//         <Typography
//           variant="body2"
//           color="textSecondary"
//         >{`${progress}%`}</Typography>
//       </Box>
//     </Box>
//   )}
//   <Typography
//     variant="subtitle2"
//     className={`upload-message ${isError ? "error" : ""}`}
//   >
//     {message}
//   </Typography>
//   {/* <Typography variant="h6" className="list-header">
//     List of Files
//   </Typography>
//   <ul className="list-group">
//     {fileInfos &&
//       fileInfos.map((file, index) => (
//         <ListItem divider key={index}>
//           <a href={file.url}>{file.name}</a>
//         </ListItem>
//       ))}
//   </ul> */}
// </div>
// );
//};
export default FileUpload;
