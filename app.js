var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var submitButton = document.getElementById('submit');
var userLocation = document.getElementById('userLocation');
var showData = document.getElementById('showData');
var loadingIndicator = document.getElementById('loading');
var suggestionsDiv = document.getElementById('suggestionsDiv');
submitButton.addEventListener('click', getUserLocation);
document.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        getUserLocation();
    }
});
function getUserLocation() {
    return __awaiter(this, void 0, void 0, function () {
        var userInput, locationCoordinates, response, dateToShow, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInput = userLocation.value.trim();
                    if (userInput === '') {
                        alert("Enter a Location");
                        return [2 /*return*/];
                    }
                    userLocation.value = '';
                    loadingIndicator.style.display = 'block';
                    showData.innerHTML = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getLocationCoordinates(userInput)];
                case 2:
                    locationCoordinates = _a.sent();
                    return [4 /*yield*/, getLocationWeather(locationCoordinates.longitude, locationCoordinates.latitude)];
                case 3:
                    response = _a.sent();
                    dateToShow = {
                        name: locationCoordinates.details,
                        temperature: response.temperature,
                        windSpeed: response.windSpeed
                    };
                    showData.innerHTML = "\n        <p style=\"background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 4px; border-left: 4px solid #4CAF50;\">\n            <strong>Location:</strong> ".concat(dateToShow.name, "\n        </p>\n        <p style=\"background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 4px; border-left: 4px solid #2196F3;\">\n            <strong>Temperature:</strong> ").concat(dateToShow.temperature, "\u00B0C\n        </p>\n        <p style=\"background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 4px; border-left: 4px solid #FF9800;\">\n            <strong>Wind Speed:</strong> ").concat(dateToShow.windSpeed, " km/h\n        </p>\n        ");
                    loadingIndicator.style.display = 'none';
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getLocationCoordinates(placeName) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data, _a, lat, lon, display_name, dataToReturn;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = "https://nominatim.openstreetmap.org/search?q=".concat(encodeURIComponent(placeName), "&format=json&limit=1");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    if (data.length > 0) {
                        _a = data[0], lat = _a.lat, lon = _a.lon, display_name = _a.display_name;
                        dataToReturn = {
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lon),
                            details: display_name
                        };
                        return [2 /*return*/, dataToReturn];
                    }
                    else {
                        alert("not found");
                        throw new Error('Place not found');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getLocationWeather(longitude, latitude) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, weatherData, dataToReturn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.open-meteo.com/v1/forecast?latitude=".concat(latitude, "&longitude=").concat(longitude, "&current_weather=true");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    weatherData = _a.sent();
                    dataToReturn = {
                        windSpeed: weatherData.current_weather.windspeed,
                        temperature: weatherData.current_weather.temperature,
                    };
                    return [2 /*return*/, dataToReturn];
            }
        });
    });
}
userLocation.addEventListener('input', function () { return __awaiter(_this, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = userLocation.value;
                if (query.length < 3) {
                    suggestionsDiv.innerHTML = '';
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetchAndDisplaySuggestions(query)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function fetchAndDisplaySuggestions(query) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, suggestions, _loop_1, i, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://nominatim.openstreetmap.org/search?q=".concat(encodeURIComponent(query), "&format=json");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    suggestions = _a.sent();
                    suggestionsDiv.innerHTML = '';
                    _loop_1 = function (i) {
                        var suggestion = suggestions[i];
                        var div = document.createElement('div');
                        div.textContent = suggestion.display_name;
                        div.style.color = 'white';
                        div.addEventListener('click', function () {
                            userLocation.value = suggestion.display_name;
                            suggestionsDiv.innerHTML = '';
                        });
                        suggestionsDiv.appendChild(div);
                    };
                    for (i = 0; i < suggestions.length; i++) {
                        _loop_1(i);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error fetching location suggestions:', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
