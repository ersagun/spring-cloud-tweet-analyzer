package shared;

public class TweetStats {
    private int id;
    private int nbTweet;
    private Float score;
    private Float magnitude;
    private User user;

    public TweetStats() {
    }

    public TweetStats(int id, int nbTweet, Float score, Float magnitude, User user) {
        this.id = id;
        this.nbTweet = nbTweet;
        this.score = score;
        this.magnitude = magnitude;
        this.user = user;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public Float getMagnitude() {
        return magnitude;
    }

    public void setMagnitude(Float magnitude) {
        this.magnitude = magnitude;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getNbTweet() {
        return nbTweet;
    }

    public void setNbTweet(int nbTweet) {
        this.nbTweet = nbTweet;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "TweetStats{" +
                "id=" + id +
                ", nbTweet=" + nbTweet +
                ", score=" + score +
                ", magnitude=" + magnitude +
                ", user=" + user +
                '}';
    }
}
