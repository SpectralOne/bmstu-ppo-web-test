### master-db:

```bash
createuser --replication -P repluser
```

// postgresql.conf
```conf
wal_level = replica
max_wal_senders = 2
max_replication_slots = 2
hot_standby = on
hot_standby_feedback = on
```

```bash
docker network inspect bmstu-ppo-web-test_default | grep Subnet
```

// pg_hba.conf
```conf
host    replication     all             SUBNET           md5
```

### slave:

```bash
chown postgres /var/lib/postgresql/data
rm -rf /var/lib/postgresql/data/*

su - postgres -c "pg_basebackup --host=master-db --username=repluser --pgdata=/var/lib/postgresql/data --wal-method=stream --write-recovery-conf"
```

### check
```sql
select * from pg_stat_replication; -- master
select * from pg_stat_wal_receiver; -- slave
```