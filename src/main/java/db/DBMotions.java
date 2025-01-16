package db;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class DBMotions {
    private Session session;
    public DBMotions(){
        session = HibernateSessionFactory.getSessionFactory().openSession();
    }

    public void save(PointModel point) {
        Transaction tx1 = session.beginTransaction();
        session.save(point);
        tx1.commit();
    }


    public List<PointModel> lastFive() {
        String hql = "FROM PointModel ORDER BY server_time DESC";
//        String hql = "FROM PointModel";
        Query<PointModel> query = session.createQuery(hql, PointModel.class);
        query.setMaxResults(5);
        return query.list();
    }
}
