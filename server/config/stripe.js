let publicKey = 'pk_test_51H3brRGadtO49G4VwOJqGPrV8V0kxSyYbql3fgvcanw1ZyHnbbdrf0WGJGU8p5GTKJR5uhs3lVESIOGSGZcbRowQ006d8dUZ7S'
let secretKey = 'sk_test_51H3brRGadtO49G4VJMINqUwQcw9Z7FCO8vG2LKUdwhUjGzp9FZlPoLQBCekZqt3Nj4PGdQmpN5Krnmeetvc6t7jA00B36F7Ngr'
let clientID = 'ca_HxKiIXTXduSFJ5iO7Sgo4Zcm9MGOQnfk'
let options = {}

if (process.env.NODE_ENV === 'production') {
  publicKey = 'pk_live_51H3brRGadtO49G4V5TSm4tDWFl8xsGHVBf6TKU04tWBwviFOnv15KahVa43dqEzczt29EF9r4qldVKrwPaJDkTpE00KDVfZvXt'
  secretKey = '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'
  clientID = 'ca_HxKijofjG0IijmpZ1CLeMPaldTjaxbps'
}

module.exports = {
  publicKey: publicKey,
  secretKey: secretKey,
  options: options,
  clientID: clientID
}
