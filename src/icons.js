// Import the library function and the icons you need
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faAppleAlt,
	faAppleWhole,
	faHome,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

// Add the icons to the library
library.add(faHome, faUser, faAppleWhole, faAppleAlt);

// Now, faHome and faUser can be referenced by their names as strings anywhere in your app
