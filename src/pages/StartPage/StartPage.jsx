import React, { useState, useEffect, useRef } from "react";
import "./StartPage.css";

const StartPage = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentSceneKey, setCurrentSceneKey] = useState("NORMAL");
  const scrollRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isAugustVideoPlaying, setIsAugustVideoPlaying] = useState(false);

  const AUGUST_CONTACT = {
    id: "contact-august",
    name: "August27",
    skypeName: "Aug27",
    status: "online",
    statusMessage: "",
    country: "United States",
    language: "English",
    gender: "Male",
    localTime: "3:31 PM United States",
    image: "/assets/flower.png",
  };

  const ensureAugustExists = () => {
    setContacts((prev) => {
      const exists = prev.some((c) => c.skypeName === "Aug27");
      if (exists) return prev;
      return [...prev, AUGUST_CONTACT];
    });

    setContactChatHistories((prev) => {
      if (prev["contact-august"]) return prev;
      return {
        ...prev,
        "contact-august": [
          {
            id: "august-hey",
            sender: "HarborLine",
            text: "Hey.",
            time: "3:31 PM",
          },
        ],
      };
    });

    setSelectedContactId("contact-august");
  };

  const [contacts, setContacts] = useState([
    {
      id: "contact-1",
      name: "Nerylix",
      image: "/assets/animal.jpg",
      skypeName: "Nerylix",
      status: "offline",
      statusMessage: "Listening to Linkin Park Numb",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "3:31 PM United States",
      chatHistory: [],
    },
    {
      id: "contact-2",
      name: "Oman03",
      skypeName: "Oman03",
      status: "busy",
      statusMessage: "Cool story bro",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM United States",
      chatHistory: [],
    },
    {
      id: "contact-3",
      name: "Matt_The_Rat65",
      skypeName: "Matt_The_Rat65",
      status: "offline",
      statusMessage: "Waiting for new season of Lost",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
    {
      id: "contact-4",
      name: "Broderboy",
      skypeName: "Broderboy",
      status: "offline",
      statusMessage: "Long night with the osciliscope",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
    {
      id: "contact-5",
      name: "Peter Chung",
      skypeName: "Peter Chung",
      status: "online",
      statusMessage: "",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
    {
      id: "contact-6",
      name: "Crankeedoo",
      skypeName: "Crankeedoo",
      status: "busy",
      statusMessage: "In the Aeroplane Under The Sea",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
    {
      id: "contact-7",
      name: "soldierlyhook1",
      skypeName: "soldierlyhook1",
      status: "dnd",
      statusMessage: "Performing magic",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
    {
      id: "contact-8",
      name: "merp150",
      skypeName: "merp150",
      status: "offline",
      statusMessage: "",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
    {
      id: "contact-9",
      name: "Tranquiliser",
      skypeName: "Tranquiliser",
      status: "online",
      statusMessage: "",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
    {
      id: "contact-10",
      name: "AdmiralBi0tch",
      skypeName: "AdmiralBi0tch",
      status: "online",
      statusMessage: "Hello internet",
      country: "United States",
      language: "English",
      gender: "Male",
      localTime: "4:55 PM",
      chatHistory: [],
    },
  ]);
  const [selectedContactId, setSelectedContactId] = useState("contact-1");
  const [contactChatHistories, setContactChatHistories] = useState({
    "contact-1": [
      { id: 1, sender: "SYSTEM", text: "APRIL 2008", time: "" },
      {
        id: 2,
        sender: "Nerylix",
        text: "WOW username changed??",
        time: "9:59 PM",
      },
      { id: 3, sender: "HarborLine", text: "Na check again", time: "10:01 PM" },
      {
        id: 4,
        sender: "Nerylix",
        text: "Ah there it is invited u",
        time: "10:02 PM",
      },
      { id: 5, sender: "HarborLine", text: "shweet", time: "10:02 PM" },

      { id: 6, sender: "SYSTEM", text: "MAY 2008", time: "" },
      { id: 7, sender: "HarborLine", text: "Ay", time: "4:32 PM" },
      {
        id: 8,
        sender: "Nerylix",
        text: "Srry forgot to log on..",
        time: "8:52 PM",
      },
      {
        id: 9,
        sender: "HarborLine",
        text: "All good u down to hit wow",
        time: "9:05 PM",
      },
      { id: 10, sender: "Nerylix", text: "Cant now with fam", time: "9:31 PM" },
      { id: 11, sender: "HarborLine", text: "Tmrw?", time: "9:40 PM" },
      { id: 12, sender: "Nerylix", text: "Yeah ill lyk", time: "9:44 PM" },

      { id: 13, sender: "SYSTEM", text: "JULY 2008", time: "" },
      { id: 14, sender: "HarborLine", text: "Hey hey", time: "2:02 PM" },

      { id: 15, sender: "SYSTEM", text: "SEPTEMBER 2008", time: "" },
      {
        id: 16,
        sender: "HarborLine",
        text: "Wassup u on wow?",
        time: "5:32 PM",
      },
    ],
  });

  const [isInVideoCall, setIsInVideoCall] = useState(false);

  const selfVideoRef = useRef(null);

  const handleAddContact = () => {
    window.electronAPI.openAddContactWindow();
  };

  // 4. AUTO-SCROLL
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, contactChatHistories]); // Added contactChatHistories

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      if (isInVideoCall && selfVideoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          selfVideoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Error accessing webcam:", err);
        }
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isInVideoCall]);

  useEffect(() => {
    console.log("Setting up video call listener");

    if (window.electronAPI && window.electronAPI.onVideoCallAnswered) {
      window.electronAPI.onVideoCallAnswered((data) => {
        console.log("Video call answered received:", data);
        setIsInVideoCall(true);
        console.log("isInVideoCall set to true");
      });
    }

    return () => {
      if (window.electronAPI && window.electronAPI.removeVideoCallListener) {
        window.electronAPI.removeVideoCallListener();
      }
    };
  }, []);
  // Listen for new contacts from AddContactPage
  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onContactAdded) {
      window.electronAPI.onContactAdded((contactData) => {
        // Initialize chat history for new contact
        const newId = contactData.id;
        setContactChatHistories((prev) => ({
          ...prev,
          [newId]: contactData.chatHistory || [],
        }));
        // Add contact to list
        setContacts((prev) => [...prev, contactData]);
        // Select the new contact
        setSelectedContactId(newId);
      });
    }

    return () => {
      if (window.electronAPI && window.electronAPI.removeContactAddedListener) {
        window.electronAPI.removeContactAddedListener();
      }
    };
  }, []);

  // Update chat history when contact is selected
  useEffect(() => {
    if (selectedContactId && contactChatHistories[selectedContactId]) {
      setChatHistory(contactChatHistories[selectedContactId]);
    } else if (!selectedContactId) {
      setChatHistory([]);
    }
  }, [selectedContactId, contactChatHistories]);

  const handleContactClick = (contactId) => {
    setSelectedContactId(contactId);
  };

  const getStatusIcon = (status, contactName) => {
    if (contactName === "August27" || contactName === "Aug27") {
      return "/assets/online.svg";
    }
    switch (status) {
      case "online":
        return "/assets/online.svg";
      case "busy":
        return "/assets/busy.svg";
      case "dnd":
        return "/assets/dnd.svg";
      case "offline":
        return "/assets/offline-icon.svg";
      default:
        return "/assets/busy.svg";
    }
  };

  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  // 1. DATA CONFIGURATION
  const SCENES = {
    NORMAL: {
      initialHistory: [{ sender: "HarborLine", text: "Hey.", time: "3:31 PM" }],
      incomingScript: [],
    },
    SCENE_2: {
      initialHistory: [
        {
          sender: "HarborLine",
          text: "Hey.",
          time: "3:31 PM",
        },
        {
          sender: "August27",
          text: "Hello. Can u call tonight?",
          time: "9:31 PM",
        },
        {
          sender: "August27",
          text: "Please. I will payy u..",
          time: "11:51 PM",
        },
        {
          sender: "August27",
          text: "Are yu there? Hello. Can u ucal tonite?",
          time: "12:33 AM",
        },
        { sender: "August27", text: "Can u call tonight.", time: "1:05 AM" },
      ],
      incomingScript: [], // No new messages pop up here
    },
    SCENE_4: {
      initialHistory: [
        { sender: "August 27", text: "hey uhh", time: "2:05 AM" },
        { sender: "August 27", text: "r u arounfd", time: "2:05 AM" },
        { sender: "August 27", text: "i thinmk i saw u??", time: "2:06 AM" },
        { sender: "August 27", text: "like just now", time: "2:06 AM" },
        { sender: "August 27", text: "or am i mixign ppl", time: "2:06 AM" },
        { sender: "August 27", text: "im standin out frint", time: "2:07 AM" },
        { sender: "August 27", text: "frint of the place", time: "2:07 AM" },
        { sender: "August 27", text: "its dark tho", time: "2:07 AM" },
        { sender: "August 27", text: "u were ther right", time: "2:08 AM" },
        { sender: "August 27", text: "i swearr u were", time: "2:08 AM" },
        {
          sender: "August 27",
          text: "i saw a jaket like urs",
          time: "2:08 AM",
        },
        { sender: "August 27", text: "then it movved", time: "2:09 AM" },
        { sender: "August 27", text: "my eyes r bad", time: "2:09 AM" },
        { sender: "August 27", text: "but not thta bad", time: "2:09 AM" },
        { sender: "August 27", text: "hello??", time: "2:10 AM" },
        { sender: "August 27", text: "pls txt bak", time: "2:10 AM" },
        { sender: "August 27", text: "dont be weird", time: "2:10 AM" },
        { sender: "August 27", text: "im not tryin be", time: "2:11 AM" },
        { sender: "August 27", text: "i just wanna kno", time: "2:11 AM" },
        { sender: "August 27", text: "if that was u", time: "2:11 AM" },
        { sender: "August 27", text: "bc u lookd right", time: "2:12 AM" },
        { sender: "August 27", text: "strait at me", time: "2:12 AM" },
        { sender: "August 27", text: "like dead on", time: "2:12 AM" },
        { sender: "August 27", text: "then u turnedd", time: "2:13 AM" },
        { sender: "August 27", text: "an just", time: "2:13 AM" },
        { sender: "August 27", text: "walkd off???", time: "2:13 AM" },
        { sender: "August 27", text: "my brain cant", time: "2:14 AM" },
        { sender: "August 27", text: "proccess that", time: "2:14 AM" },
        { sender: "August 27", text: "did i do somethign", time: "2:14 AM" },
        { sender: "August 27", text: "say somethin wrong", time: "2:15 AM" },
        { sender: "August 27", text: "pls just say no", time: "2:15 AM" },
        { sender: "August 27", text: "or yes", time: "2:15 AM" },
        { sender: "August 27", text: "anythign is bettr", time: "2:16 AM" },
        { sender: "August 27", text: "than this", time: "2:16 AM" },
        { sender: "August 27", text: "im starin at", time: "2:16 AM" },
        { sender: "August 27", text: "the door still", time: "2:17 AM" },
        { sender: "August 27", text: "peopl walk past", time: "2:17 AM" },
        { sender: "August 27", text: "none of them u", time: "2:17 AM" },
        { sender: "August 27", text: "i feel so stupdi", time: "2:18 AM" },
        { sender: "August 27", text: "like reall stupid", time: "2:18 AM" },
        { sender: "August 27", text: "i thout we were", time: "2:18 AM" },
        { sender: "August 27", text: "cool at least", time: "2:19 AM" },
        { sender: "August 27", text: "freinds maybe", time: "2:19 AM" },
        { sender: "August 27", text: "u said freinds", time: "2:19 AM" },
        { sender: "August 27", text: "was that fake tho", time: "2:20 AM" },
        { sender: "August 27", text: "bc it felt real", time: "2:20 AM" },
        { sender: "August 27", text: "to me i guess", time: "2:20 AM" },
        { sender: "August 27", text: "my hands r shakn", time: "2:21 AM" },
        { sender: "August 27", text: "im typign bad", time: "2:21 AM" },
        { sender: "August 27", text: "srry", time: "2:21 AM" },
        { sender: "August 27", text: "im just confused", time: "2:21 AM" },
        { sender: "August 27", text: "and hurt a bit", time: "2:21 AM" },
        { sender: "August 27", text: "pls dont ignroe", time: "2:21 AM" },
        { sender: "August 27", text: "me like this", time: "2:21 AM" },
        { sender: "August 27", text: "i paidd u", time: "2:21 AM" },
        { sender: "August 27", text: "remmebr", time: "2:21 AM" },
        { sender: "August 27", text: "u said come bak", time: "2:21 AM" },
        { sender: "August 27", text: "i beleived u", time: "2:21 AM" },
        { sender: "August 27", text: "im still here", time: "2:21 AM" },
        { sender: "August 27", text: "waitin", time: "2:21 AM" },
        { sender: "August 27", text: "loking arond", time: "2:21 AM" },
        { sender: "August 27", text: "pls", time: "2:21 AM" },
        { sender: "August 27", text: "say somethign", time: "2:21 AM" },
        { sender: "August 27", text: "anything", time: "2:21 AM" },
        { sender: "August 27", text: "dont do this", time: "2:21 AM" },
        { sender: "August 27", text: "not like this", time: "2:21 AM" },
        { sender: "August 27", text: "i miss u", time: "2:21 AM" },
        { sender: "August 27", text: "even rn", time: "2:21 AM" },
        { sender: "August 27", text: "im right here", time: "2:21 AM" },
        { sender: "August 27", text: "Wwere di u go/", time: "2:22 AM" },
        {
          sender: "August 27",
          text: "i saw u in front and I saw u there",
          time: "2:22 AM",
        },
        {
          sender: "August 27",
          text: "walked uhk and walk offWhy?",
          time: "2:22 AM",
        },
        {
          sender: "August 27",
          text: "thout we could be friends",
          time: "2:23 AM",
        },
        {
          sender: "August 27",
          text: "i miss you here !! Come back",
          time: "2:23 AM",
        },
        { sender: "August 27", text: "please.", time: "2:23 AM" },
        { sender: "August 27", text: "good night", time: "2:23 AM" },
        {
          sender: "August 27",
          text: "good niht pleasee come backt",
          time: "2:23 AM",
        },
        {
          sender: "August 27",
          text: "please come back i paidd you",
          time: "2:23 AM",
        },
      ],
      incomingScript: [
        { sender: "August27", text: "u hate me", delay: 2000, time: "2:23 AM" },
        {
          sender: "August27",
          text: "come bac;k please",
          delay: 6000,
          time: "2:23 AM",
        },
        {
          sender: "August27",
          text: "caan we plaese talk",
          delay: 9000,
          time: "2:23 AM",
        },
        {
          sender: "August27",
          text: "Can wwe talk/",
          delay: 12000,
          time: "2:23 AM",
        },
        {
          sender: "August27",
          text: "Wh? hhwhy?",
          delay: 15000,
          time: "2:23 AM",
        },
        { sender: "August27", text: "Miss yu", delay: 17000, time: "2:23 AM" },
        {
          sender: "August27",
          text: "Jamess I miss you..",
          delay: 21000,
          time: "2:23 AM",
        },
        { sender: "August27", text: "Helloooo", delay: 23000, time: "2:23 AM" },
        {
          sender: "August27",
          text: "Where rrr u?",
          delay: 27000,
          time: "2:23 AM",
        },
        {
          sender: "August27",
          text: "WHys did you aleave!",
          delay: 32000,
          time: "2:23 AM",
        },
        {
          sender: "August27",
          text: "I'[m still herea wating",
          delay: 37000,
          time: "2:23 AM",
        },
        {
          sender: "August27",
          text: "come back. I pAid you",
          delay: 43000,
          time: "2:24 AM",
        },
        {
          sender: "August27",
          text: "I love you",
          delay: 46000,
          time: "2:24 AM",
        },
        {
          sender: "August27",
          text: "I will kill you for this.",
          delay: 54000,
          time: "2:24 AM",
        },
      ],
    },
  };

  // 2. KEYBOARD LISTENER (Director's Remote)
  useEffect(() => {
    const handleDirectorKeys = (e) => {
      // Don't trigger if James is typing
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")
        return;

      // 1: REMOVE AUGUST (Reset to base state)
      if (e.key === "1") {
        setSelectedContactId("contact-1");
        setContacts((prev) => prev.filter((c) => c.skypeName !== "Aug27"));
        setContactChatHistories((prev) => {
          const newHistories = { ...prev };
          const augustEntry = contacts.find((c) => c.skypeName === "Aug27");
          if (augustEntry) delete newHistories[augustEntry.id];
          return newHistories;
        });
        setCurrentSceneKey("NORMAL");
      }

      // 2: SCENE_2 (Scripted "Please call" messages)
      else if (e.key === "2") {
        setCurrentSceneKey("SCENE_2");
      }

      // 3: STABLE STATE (August exists, but only "Hey." @ 3:31 PM)
      else if (e.key === "3") {
        console.log("3 was pressed");
        ensureAugustExists();
        setCurrentSceneKey("NORMAL");
      }

      // 4: SCENE_4 (Frantic messages)
      else if (e.key === "4") {
        setCurrentSceneKey("SCENE_4");
      }

      // Video Trigger for Call
      else if (e.key === "v" || e.key === "V") {
        console.log("V was pressed!");
        console.log("Current Ref:", remoteVideoRef.current);
        if (remoteVideoRef.current) {
          console.log("V2 was pressed!");
          remoteVideoRef.current.play();
          setIsAugustVideoPlaying(true);
        }
      }
    };

    window.addEventListener("keydown", handleDirectorKeys);
    return () => window.removeEventListener("keydown", handleDirectorKeys);
  }, [contacts]);

  useEffect(() => {
    const scene = SCENES[currentSceneKey];
    const august = contacts.find(
      (c) => c.name === "August27" || c.skypeName === "Aug27"
    );

    if (!august || selectedContactId !== august.id) return;

    // 1. Update Profile Times
    setContacts((prev) =>
      prev.map((contact) => {
        let newTime = "3:31 PM United States"; // Default for Key 3
        if (currentSceneKey === "SCENE_2") newTime = "1:33 AM United States";
        if (currentSceneKey === "SCENE_4") newTime = "2:23 AM United States";

        if (contact.id === august.id || contact.skypeName === "Nerylix") {
          return { ...contact, localTime: newTime };
        }
        return contact;
      })
    );

    // 2. Manage Chat History
    setContactChatHistories((prev) => {
      const augustHistory = prev[august.id] || [];

      // Key 3 logic: Only keep the "Hey." message and set its time to 3:31 PM
      if (currentSceneKey === "NORMAL") {
        if (augustHistory.length > 0) {
          return {
            ...prev,
            [august.id]: [{ ...augustHistory[0], time: "3:31 PM" }],
          };
        }
        return prev;
      }

      // Load scripted histories for Scene 2 and 4
      if (scene.initialHistory && scene.initialHistory.length > 0) {
        return {
          ...prev,
          [august.id]: scene.initialHistory.map((msg) => ({
            ...msg,
            id: `initial-${Math.random()}`,
          })),
        };
      }
      return prev;
    });

    // 3. Scripted Incoming Messages
    const timeoutIds = (scene.incomingScript || []).map((msg) => {
      return setTimeout(() => {
        setContactChatHistories((prev) => ({
          ...prev,
          [august.id]: [
            ...(prev[august.id] || []),
            {
              id: `incoming-${Math.random()}`,
              sender: msg.sender,
              text: msg.text,
              time: msg.time,
            },
          ],
        }));
      }, msg.delay);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [currentSceneKey, selectedContactId, contacts.length]);

  const handleSendMessage = () => {
    if (message.trim() !== "" && selectedContactId) {
      const isToAugust = selectedContact?.name === "August27";

      let messageTime;

      if (isToAugust) {
        const localTimeMatch = selectedContact.localTime?.match(
          /\d{1,2}:\d{2}\s?[AP]M/
        );
        messageTime = localTimeMatch ? localTimeMatch[0] : "3:31 PM";
      } else {
        messageTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      const newMessage = {
        id: Date.now(),
        text: message,
        sender: "HarborLine",
        time: messageTime,
      };

      setContactChatHistories((prev) => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
      }));

      setChatHistory((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    const isAugustSelected =
      selectedContact?.name === "August27" ||
      selectedContact?.skypeName === "Aug27";

    if (
      lastMessage &&
      lastMessage.sender === "HarborLine" &&
      isAugustSelected
    ) {
      const baseDelay = 3000;
      const extraDelay = currentSceneKey === "NORMAL" ? 4000 : 0;
      const totalDelay = baseDelay + extraDelay;

      const timer = setTimeout(() => {
        window.electronAPI.openCallWindow();
      }, totalDelay);

      return () => clearTimeout(timer);
    }
  }, [chatHistory]);

  const handleDirectorReset = () => {
    setChatHistory([]);
    setCurrentSceneKey("NORMAL");
    setMessage("");
    setContacts((prev) => prev.filter((c) => c.skypeName !== "Aug27"));
    setContactChatHistories({
      "contact-1": [
        { id: 1, sender: "SYSTEM", text: "APRIL 2008", time: "" },
        {
          id: 2,
          sender: "Nerylix",
          text: "WOW username changed??",
          time: "9:59 PM",
        },
        {
          id: 3,
          sender: "HarborLine",
          text: "Na check again",
          time: "10:01 PM",
        },
        {
          id: 4,
          sender: "Nerylix",
          text: "Ah there it is invited u",
          time: "10:02 PM",
        },
        { id: 5, sender: "HarborLine", text: "shweet", time: "10:02 PM" },
        { id: 6, sender: "SYSTEM", text: "MAY 2008", time: "" },
        { id: 7, sender: "HarborLine", text: "Ay", time: "4:32 PM" },
        {
          id: 8,
          sender: "Nerylix",
          text: "Srry forgot to log on..",
          time: "8:52 PM",
        },
        {
          id: 9,
          sender: "HarborLine",
          text: "All good u down to hit wow",
          time: "9:05 PM",
        },
        {
          id: 10,
          sender: "Nerylix",
          text: "Cant now with fam",
          time: "9:31 PM",
        },
        { id: 11, sender: "HarborLine", text: "Tmrw?", time: "9:40 PM" },
        { id: 12, sender: "Nerylix", text: "Yeah ill lyk", time: "9:44 PM" },
        { id: 13, sender: "SYSTEM", text: "JULY 2008", time: "" },
        { id: 14, sender: "HarborLine", text: "Hey hey", time: "2:02 PM" },
        { id: 15, sender: "SYSTEM", text: "SEPTEMBER 2008", time: "" },
        {
          id: 16,
          sender: "HarborLine",
          text: "Wassup u on wow?",
          time: "5:32 PM",
        },
      ],
    });

    setSelectedContactId("contact-1");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setChatHistory([]);
      setMessage("");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPlaceholderText = () => {
    if (selectedContact) {
      return `Type a message to ${selectedContact.name} here`;
    }
    return "Type a message to August27 here";
  };

  if (isInVideoCall) {
    console.log("In video call");
    return (
      <div className="start-page-container">
        <div className="skype-background-layer">
          <div className="skype-sidebar">
            {/* USER BOX */}
            <div className="user-profile-card">
              <div className="status-row">
                <img src="/assets/online.svg" className="status-icon" alt="" />
                <img
                  src="/assets/polygon2.svg"
                  className="polygon-icon"
                  alt=""
                />
                <span className="user-display-name">HarborLine</span>
              </div>
              <div className="profile-content">
                <div className="avatar-placeholder">
                  <img
                    src="/assets/james.png"
                    className="james-profile"
                    alt=""
                  />
                </div>
                <div className="mood-area-container">
                  <div className="mood-area">
                    <div className="mood-bubble">¯\_(ツ)_/¯</div>
                    <img
                      src="/assets/clapper.png"
                      className="clapper-icon"
                      alt=""
                    />
                  </div>
                  <button className="personalize-btn">
                    <span className="personalize-text">Personalize ▾</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="promo-link-row">
              <img src="/assets/landline.svg" className="promo-icon" alt="" />
              <span className="promo-text">
                Make your free call to an ordinary phone
              </span>
            </div>

            <div className="contacts-container">
              <div className="search-bar-row">
                <button className="add-contact-btn" onClick={handleAddContact}>
                  <img
                    src="/assets/person.png"
                    className="add-user-icon"
                    alt=""
                  />
                  <span className="add-btn-text">New</span>
                  <img
                    src="/assets/polygon2-black.svg"
                    className="dropdown-arrow-svg"
                    style={{ width: "10px" }}
                    alt=""
                  />
                </button>
                <input
                  type="text"
                  className="contact-search"
                  placeholder="Search Contacts..."
                />
              </div>
              <div className="tab-headers">
                <div className="tab-active">Contacts</div>
                <div className="tab">Conversations</div>
              </div>
              <div className="contacts-list">
                <div className="contacts-list-scrollable">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`contact-item ${selectedContactId === contact.id ? "contact-selected" : ""}`}
                      onClick={() => handleContactClick(contact.id)}
                    >
                      <div className="contact-status-icon">
                        <img
                          src={getStatusIcon(contact.status, contact.name)}
                          alt=""
                        />
                      </div>
                      <p className="contact-name">{contact.name}</p>
                      <p className="contact-status-message">
                        {contact.statusMessage}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="usercount-footer">
                  <p>16,175,278 people online</p>
                </div>
                {/* NEW FOOTER NAVIGATION */}
                <div className="sidebar-footer-nav">
                  <div className="nav-item">
                    <img
                      src="/assets/magnifying-glass.png"
                      className="nav-icon"
                      alt=""
                    />
                    <span>Directory</span>
                  </div>
                  <div className="nav-item">
                    <img
                      src="/assets/shopping-bag.png"
                      className="nav-icon"
                      alt=""
                    />
                    <span>Shop</span>
                  </div>
                  <div
                    className="nav-item"
                    onClick={() => window.electronAPI.openBlockedWindow()}
                  >
                    <img
                      src="/assets/gold-badge.png"
                      className="nav-icon"
                      alt=""
                    />
                    <span>Blocked users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-header">
            <div className="status-row">
              <img
                src={
                  selectedContact
                    ? getStatusIcon(
                        selectedContact.status,
                        selectedContact.name
                      )
                    : "/assets/busy.svg"
                }
                className="status-icon"
                alt=""
              />
              <span className="user-display-name">
                {selectedContact ? selectedContact.name : "August27"}
              </span>
              <div className="add-people-button">
                <img src="/assets/add.svg" className="add-icon" alt="" />
                <span className="add-people-text">Add people</span>
              </div>
            </div>
          </div>

          <div className="chat-column">
            <div className="black-bg">
              <div className="august-profile-card-video">
                <div className="video-container">
                  {/* 1. The Placeholder Image */}
                  {console.log("isAugustVideoPlaying:", isAugustVideoPlaying)}
                  {!isAugustVideoPlaying && (
                    <img
                      src="/assets/flower.png"
                      className="placeholder-flower"
                      alt="Profile"
                    />
                  )}

                  {/* 2. The Video Element - only render when playing */}
                  <video
                    ref={remoteVideoRef}
                    className={`video-call ${isAugustVideoPlaying ? 'visible' : 'hidden'}`}
                    src="/assets/temp_clip.mov"
                    playsInline
                    muted
                    onEnded={() => {
                      setIsAugustVideoPlaying(false);
                      setIsInVideoCall(false);
                    }}
                  />
                </div>
              </div>
              <div className="self-view-card">
                <video
                  ref={selfVideoRef}
                  className="video-self"
                  autoPlay
                  playsInline
                  muted
                />
              </div>
            </div>
            <div className="video-call-controls">
              <img
                src="/assets/hangup-button.svg"
                alt=""
                onClick={() => {
                  setIsInVideoCall(false);
                  setIsAugustVideoPlaying(false);
                }}
                style={{ cursor: "pointer" }}
              />
              <img
                src="/assets/stop-video.svg"
                alt=""
                onClick={() => setIsVideoEnabled(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="start-page-container">
      <div className="skype-background-layer">
        <div className="skype-sidebar">
          {/* USER BOX */}
          <div className="user-profile-card">
            <div className="status-row">
              <img src="/assets/online.svg" className="status-icon" alt="" />
              <img src="/assets/polygon2.svg" className="polygon-icon" alt="" />
              <span className="user-display-name">HarborLine</span>
            </div>
            <div className="profile-content">
              <div className="avatar-placeholder">
                <img src="/assets/james.png" className="james-profile" alt="" />
              </div>
              <div className="mood-area-container">
                <div className="mood-area">
                  <div className="mood-bubble">¯\_(ツ)_/¯</div>
                  <img
                    src="/assets/clapper.png"
                    className="clapper-icon"
                    alt=""
                  />
                </div>
                <button className="personalize-btn">
                  <span className="personalize-text">Personalize ▾</span>
                </button>
              </div>
            </div>
          </div>

          <div className="promo-link-row">
            <img src="/assets/landline.svg" className="promo-icon" alt="" />
            <span className="promo-text">
              Make your free call to an ordinary phone
            </span>
          </div>

          <div className="contacts-container">
            <div className="search-bar-row">
              <button className="add-contact-btn" onClick={handleAddContact}>
                <img
                  src="/assets/person.png"
                  className="add-user-icon"
                  alt=""
                />
                <span className="add-btn-text">New</span>
                <img
                  src="/assets/polygon2-black.svg"
                  className="dropdown-arrow-svg"
                  style={{ width: "10px" }}
                  alt=""
                />
              </button>
              <input
                type="text"
                className="contact-search"
                placeholder="Search Contacts..."
              />
            </div>
            <div className="tab-headers">
              <div className="tab-active">Contacts</div>
              <div className="tab">Conversations</div>
            </div>
            <div className="contacts-list">
              <div className="contacts-list-scrollable">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`contact-item ${selectedContactId === contact.id ? "contact-selected" : ""}`}
                    onClick={() => handleContactClick(contact.id)}
                  >
                    <div className="contact-status-icon">
                      <img
                        src={getStatusIcon(contact.status, contact.name)}
                        alt=""
                      />
                    </div>
                    <p className="contact-name">{contact.name}</p>
                    <p className="contact-status-message">
                      {contact.statusMessage}
                    </p>
                  </div>
                ))}
              </div>
              <div className="usercount-footer">
                <p>16,175,278 people online</p>
              </div>
            </div>
            {/* NEW FOOTER NAVIGATION */}
            <div className="sidebar-footer-nav">
              <div className="nav-item">
                <img
                  src="/assets/magnifying-glass.png"
                  className="nav-icon"
                  alt=""
                />
                <span>Directory</span>
              </div>
              <div className="nav-item">
                <img
                  src="/assets/shopping-bag.png"
                  className="nav-icon"
                  alt=""
                />
                <span>Shop</span>
              </div>
              <div
                className="nav-item"
                onClick={() => window.electronAPI.openBlockedWindow()}
              >
                <img src="/assets/gold-badge.png" className="nav-icon" alt="" />
                <span>Blocked users</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-header">
          <div className="august-profile-card">
            <div className="status-row">
              <img
                src={
                  selectedContact
                    ? getStatusIcon(
                        selectedContact.status,
                        selectedContact.name
                      )
                    : "/assets/busy.svg"
                }
                className="status-icon"
                alt=""
              />
              <span className="user-display-name">
                {selectedContact ? selectedContact.name : "August27"}
              </span>
              <div className="add-people-button">
                <img src="/assets/add.svg" className="add-icon" alt="" />
                <span className="add-people-text">Add people</span>
              </div>
            </div>
            <div className="profile-content">
              <div className="august-placeholder">
                {selectedContact && (
                  <img
                    key={selectedContact.id}
                    src={selectedContact.image || "/assets/flower.png"}
                    className="august-icon"
                    alt={selectedContact.name}
                  />
                )}
              </div>
              <div className="mood-area2">
                <span className="status-message">
                  {selectedContact?.statusMessage || ""}
                </span>
                <div className="time-area">
                  <img
                    src="/assets/usflag-icon.png"
                    className="flag-icon"
                    alt=""
                  />
                  <span>{selectedContact?.localTime || ""}</span>
                </div>
                <div className="language-area">
                  <img
                    src="/assets/language.svg"
                    className="language-icon"
                    alt=""
                  />
                  <span>{selectedContact?.language || ""}</span>
                  <div className="arrow-group">
                    <div className="left-arrow">
                      <img src="/assets/left.svg" alt="" />
                    </div>
                    <div className="right-arrow">
                      <img src="/assets/right.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="gender-area">
                  <img
                    src="/assets/gender.svg"
                    className="gender-icon"
                    alt=""
                  />
                  <span>{selectedContact?.gender || ""}</span>
                </div>
                <div className="name-area">
                  <img src="/assets/skype.png" className="skype2-icon" alt="" />
                  <span>{selectedContact?.skypeName || ""}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-column">
          <div className="skype-tab">
            <img src="/assets/skype.png" className="skype-tab-icon" alt="" />
            <span className="skype-text">Skype</span>
          </div>
          <div className="chat-field">
            <div className="chat-buttons">
              <div className="left-buttons">
                <button className="skype-call-button">
                  <img
                    src="/assets/call-button.svg"
                    className="call-icon"
                    alt=""
                  />
                </button>
                <button className="skype-call-button">
                  <img
                    src="/assets/video-call.svg"
                    className="video-call-icon"
                    alt=""
                  />
                </button>
              </div>
              <div className="right-button">
                <div className="info-dropdown-pill">
                  <div className="info-icon-wrapper">
                    <img
                      src="/assets/ellipse2.svg"
                      className="info-icon-svg"
                      alt=""
                    />
                    <span className="info-char">i</span>
                  </div>
                  <img
                    src="/assets/polygon2.svg"
                    className="dropdown-arrow-svg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {currentSceneKey === "SCENE_4" && (
              <div className="unread-alert-wrapper">
                <img
                  src="/assets/unread-messages-alert.svg"
                  alt="Unread messages"
                  className="unread-alert-img"
                />
              </div>
            )}

            {/* <div className="history-container" ref={scrollRef}>
              {chatHistory.map((msg) => (
                <div key={msg.id || Math.random()} className="chat-bubble-grid">
                  <span className="msg-user">{msg.sender}</span>
                  <span className="msg-text">{msg.text}</span>
                  <span className="msg-time">{msg.time}</span>
                </div>
              ))}
            </div> */}
            <div className="history-container" ref={scrollRef}>
              {chatHistory.map((msg) => {
                if (msg.sender === "SYSTEM") {
                  return (
                    <div key={msg.id} className="chat-date-divider">
                      <hr />
                      <span>{msg.text}</span>
                      <hr />
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="chat-bubble-grid">
                    <span className="msg-user">{msg.sender}</span>
                    <span className="msg-text">{msg.text}</span>
                    <span className="msg-time">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            <div className="message-box">
              <div className="show-messages">
                <img
                  src="/assets/clock.svg"
                  className="tool-icon-clock"
                  alt=""
                />
                <span className="tool-text">Show messages from:</span>
                <span className="blue-text">Yesterday</span>
                <span className="tool-text">•</span>
                <span className="blue-text">7 days</span>
                <span className="tool-text">•</span>
                <span className="blue-text">30 days</span>
                <span className="tool-text">•</span>
                <span className="blue-text">From Beginning</span>
              </div>
              <div className="input-row-wrapper">
                <div className="message-field">
                  <div className="message-tools">
                    <div className="tool-item">
                      <img
                        src="/assets/smile.svg"
                        className="tool-icon"
                        alt=""
                      />
                      <img
                        src="/assets/polygon2.svg"
                        className="tool-icon-small"
                        alt=""
                      />
                    </div>
                    <div className="tool-item">
                      <img
                        src="/assets/file.svg"
                        className="tool-icon"
                        alt=""
                      />
                      <span className="tool-text">Send file</span>
                    </div>
                    <div className="tool-item">
                      <img
                        src="/assets/puzzle.svg"
                        className="tool-icon"
                        alt=""
                      />
                      <span className="tool-text">Extras</span>
                    </div>
                  </div>
                  <textarea
                    className="chat-input"
                    placeholder={getPlaceholderText()}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={!selectedContactId}
                  />
                </div>
                <div className="message-button" onClick={handleSendMessage}>
                  <img
                    src="/assets/icon.svg"
                    className="send-icon"
                    alt="Send"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIRECTOR PANEL */}
      <div className="director-panel">
        <button onClick={() => handleDirectorKeys({ key: "1", target: {} })}>
          1: Remove August
        </button>
        <button onClick={() => setCurrentSceneKey("SCENE_2")}>
          2: Scene 2
        </button>
        <button onClick={() => setCurrentSceneKey("NORMAL")}>
          3: August Stable (Hey.)
        </button>
        <button onClick={() => setCurrentSceneKey("SCENE_4")}>
          4: Scene 4
        </button>
      </div>
    </div>
  );
};

export default StartPage;
