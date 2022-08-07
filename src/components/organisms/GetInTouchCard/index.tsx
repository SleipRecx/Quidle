import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "src/components/atoms/buttons/Button";
import Input from "src/components/atoms/inputs/Input";
import { Column } from "src/components/atoms/layout";
import { H4 } from "src/components/atoms/typography";
import { db } from "src/services/firebaseService";
export type GetInTouchCardProps = {
  onComplete: () => void;
};
const GetInTouchCard = ({ onComplete }: GetInTouchCardProps) => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    if (!feedback) {
      toast("Please write some feedback to us", {
        icon: "🥺",
        position: "bottom-center",
      });
      return;
    }
    setLoading(true);
    await db.collection("feedback").add({
      feedback: feedback,
      email: email,
      createdAt: Date.now(),
      date: new Date().toDateString(),
    });
    setLoading(false);
    toast.success("You're feedback is sent - thank you!", {
      position: "bottom-center",
    });
    onComplete();
  };

  return (
    <Column>
      <Column fullWidth center mt="20px" mb="20px">
        <H4 bold>Help us improve!</H4>
      </Column>
      <Column center mb="10px">
        <Column mb="10px" fullWidth>
          <Input
            onChangeText={(text) => setFeedback(text)}
            value={feedback}
            placeholder="Your feedback"
          />
        </Column>
        <Column mb="10px" fullWidth>
          <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Your email (optional)"
          />
        </Column>
      </Column>
      <Column center fullWidth>
        <Button onClick={onPress} loading={loading}>
          SEND FEEDBACK
        </Button>
      </Column>
    </Column>
  );
};

export default GetInTouchCard;
