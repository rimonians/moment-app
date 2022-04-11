import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import scrollTop from "../../utils/scrollTop";
import { uploadImage } from "../../firebase/firebase.storage";
import numbering from "../../utils/numbering";
import { useNavigate } from "react-router-dom";
import { momentAdd } from "../../firebase/firebase.moment";

const Moment = () => {
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const userId = useSelector((state) => state.auth.user.uid);

  const navigate = useNavigate();

  useEffect(() => {
    scrollTop();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wasSubmitted) {
      setWasSubmitted(true);
      if (!file || !description) {
        toast.error("অনুগ্রহ করে সবগুলো তথ্য দিন");
        setWasSubmitted(false);
      } else {
        uploadImage(file, (status, message, info) => {
          if (status === 200) {
            setProgress(info);
          } else if (status === 201) {
            setProgress(0);
            momentAdd({ userId, description, image: info }, (status, info) => {
              if (status === 200) {
                toast.success(info);
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } else {
                toast.error(info);
                setWasSubmitted(false);
              }
            });
          } else if (status === 500) {
            setProgress(0);
            toast.error(message);
            setWasSubmitted(false);
          }
        });
        setWasSubmitted(false);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h3>মোমেন্ট ফর্ম</h3>
        <Label htmlFor="file">ফাইল বাছুন</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Label htmlFor="description">ক্যাপশন লিখুন</Label>
        <Textarea
          id="description"
          placeholder="ক্যাপশন লিখুন..."
          value={description}
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>{progress ? numbering(progress) + "% আপলোড হয়েছে..." : ""}</p>
        <Button>মোমেন্ট তৈরি করুন</Button>
      </Form>
    </div>
  );
};

export default Moment;
