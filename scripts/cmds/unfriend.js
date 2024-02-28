module.exports.config = {
  name: "unfriend",
  role: 2,
  category: "admin",
}

module.exports.onStart = async ({ event, api, args, message }) => {
  api.unfriend(args.join(" "));
}