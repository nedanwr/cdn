import { useState, useEffect } from "react";
import "./initFirebase";

const formatAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
});