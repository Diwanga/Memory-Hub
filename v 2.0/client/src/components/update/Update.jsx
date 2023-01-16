import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import storage from '../fierbaase'

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const coverUpload = (file) => {

  if(file){
  // console.log('start of upload')

  const uploadTask =  storage.ref(`/images/${imageAsFile.name}`).put(file)
  //initiates the firebase side uploading 
  uploadTask.on('state_changed', 
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    storage.ref('images').child(imageAsFile.name).getDownloadURL()
     .then(fireBaseUrl => {
      setCoverUrl(fireBaseUrl)
     })
  })
  }
  setCoverUrl(user.coverPic)
}


  const profilepicUpload =  (file) => {
    if(file) {
    console.log('start of upload')
    const uploadTask = storage.ref(`/images/${file.name}`).put(file)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(file.name).getDownloadURL()
       .then(fireBaseUrl => {
        setProfileUrl(fireBaseUrl)
       })
    })
    }
    setProfileUrl(user.profilePic)
  }
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    
    let coverUrl;
    let profileUrl;
     coverUpload(cover) ; 
     profilepicUpload(profile);
    
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  }

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
