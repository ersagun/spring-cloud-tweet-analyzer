package shared;

public class Tweet {

    private int id;
    private  String name;
    private int age;
    private  String text;
    private int numberOfFollower;
    private User user;

    public Tweet() {
    }

    public Tweet(int id, String name, int age, String text, int numberOfFollower, User user) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.text = text;
        this.numberOfFollower = numberOfFollower;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getNumberOfFollower() {
        return numberOfFollower;
    }

    public void setNumberOfFollower(int numberOfFollower) {
        this.numberOfFollower = numberOfFollower;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Tweet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", text='" + text + '\'' +
                ", numberOfFollower=" + numberOfFollower +
                ", user=" + user +
                '}';
    }
}
