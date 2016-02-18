from esearch import create_mapping, reading_and_indexing

create_mapping(index="emails_test")
reading_and_indexing(index="emails_test", file="../config/emails_test.json")