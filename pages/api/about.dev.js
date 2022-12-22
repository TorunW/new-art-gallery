"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getAbout;

var _next = require("next");

var _db = require("../../config/db");

function getAbout() {
  var req,
      res,
      db,
      about,
      _args = arguments;
  return regeneratorRuntime.async(function getAbout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _args.length > 0 && _args[0] !== undefined ? _args[0] : _next.NextApiRequest;
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _next.NextApiResponse;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _db.importDb)());

        case 4:
          db = _context.sent;

          if (!(req.method === 'POST')) {
            _context.next = 8;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(db.run('INSERT INTO about(title, about_text) VALUES (?,?)', req.body.fullname, req.body.email));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(db.all('select * from about'));

        case 10:
          about = _context.sent;
          res.json(about);
          console.log(about);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}