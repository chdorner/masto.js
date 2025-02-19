it('handles domain blocks', async () => {
  const domain = 'example.com';
  let domainBlock = await admin.v1.admin.domainBlocks.create({
    domain,
    rejectMedia: true,
  });
  expect(domainBlock.domain).toMatch(/example.com/);
  expect(domainBlock.rejectMedia).toBe(true);

  try {
    await admin.v1.admin.domainBlocks.update(domainBlock.id, {
      rejectMedia: false,
    });

    domainBlock = await admin.v1.admin.domainBlocks.fetch(domainBlock.id);
    expect(domainBlock.rejectMedia).toBe(false);

    const list = await admin.v1.admin.domainBlocks.list();
    expect(list).toContainId(domainBlock.id);
  } finally {
    await admin.v1.admin.domainBlocks.remove(domainBlock.id);
  }
});
